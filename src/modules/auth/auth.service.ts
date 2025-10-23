import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SingInDto } from './dto/singin';
import { ResetPasswordDto } from './dto/resetPassword';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>, // ✅ كده هيتعرف صح
    private readonly jwtService: JwtService,
  ) {}

  // 🛠️ Hash Password
  async hashPassword(plain: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(plain, salt);
  }

  // 🛠️ Verify Password
  async verifyPassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  // // 🛠️ Generate Token
  generateToken(payload: {
    userId: string;
    email: string;
    userRoles: string[];
  }): string {
    return this.jwtService.sign(payload);
  }

  // 🛠️ Verify Token
  verifyToken(token: string): { [key: string]: any } {
    return this.jwtService.verify(token);
  }

  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    // 1️⃣ تحقق من عدم وجود الإيميل قبل الإنشاء
    const findUser = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (findUser) {
      throw new ConflictException('User with this email already exists');
    }

    // 2️⃣ إنشاء مستخدم جديد
    const user = this.usersRepository.create(createUserDto);

    // 3️⃣ هاش للباسورد
    const hashPassword = await this.hashPassword(createUserDto.password);
    user.password = hashPassword;

    // 4️⃣ حفظ المستخدم
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating user: ${String(error)}`,
      );
    }
  }

  async signIn(
    singInDto: SingInDto,
  ): Promise<{ user: UserResponse; token: string }> {
    const user = await this.usersRepository.findOneBy({
      email: singInDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await this.verifyPassword(
      singInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      userId: user.id,
      email: user.email,
      userRoles: user.roles,
    };
    const token = this.generateToken(payload);

    // ✅ رجّع بس الحقول اللي عايزها
    const userResponse: UserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    return { user: userResponse, token };
  }

  async reSetPassword(
    resetPassword: ResetPasswordDto,
  ): Promise<UserEntity | string> {
    // 1️⃣ البحث عن المستخدم بالإيميل
    const user = await this.usersRepository.findOneBy({
      email: resetPassword.email,
    });

    if (!user) {
      return 'User not found';
    }

    // 2️⃣ التحقق من الباسورد القديم
    const isOldPasswordValid = await this.verifyPassword(
      resetPassword.oldPassword,
      user.password,
    );

    if (!isOldPasswordValid) {
      return 'Old password is incorrect';
    }

    // 3️⃣ التأكد إن الباسورد الجديد == الكومفيرم
    if (resetPassword.newPassword !== resetPassword.confirmNewPassword) {
      return 'New passwords do not match';
    }

    // 4️⃣ هاش للباسورد الجديد
    const hashPassword = await this.hashPassword(resetPassword.newPassword);
    user.password = hashPassword;

    // 5️⃣ حفظ المستخدم
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error resetting password: ${String(error)}`,
      );
    }
  }
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.usersRepository.create(createUserDto);

    const hashPassword = await this.hashPassword(createUserDto.password);
    user.password = hashPassword;
    // التحقق من وجود مستخدم بنفس البريد الإلكتروني
    const findUser = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (findUser) {
      throw new ConflictException('User with this email already exists');
    }

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating user: ${String(error)}`,
      );
    }
  }

  findAll(): Promise<UserEntity[]> {
    const users = this.usersRepository.find();
    return users;
  }

  findOne(id: string): Promise<UserEntity | null> {
    const user = this.usersRepository.findOneBy({ id });
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | string | undefined> {
    const user = await this.usersRepository.preload({ id, ...updateUserDto });
    if (!user) {
      return `User with ID ${id} not found`;
    }
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      return null;
    }
    await this.usersRepository.remove(user);
    return user;
  }
}
