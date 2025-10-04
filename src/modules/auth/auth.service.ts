import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SingInDto } from './dto/singin';
import { ResetPasswordDto } from './dto/resetPassword';
import { JwtService } from '@nestjs/jwt';

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
  generateToken(payload: { userId: number; email: string }) {
    console.log('🧩 payload:', payload);
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
  ): Promise<{ user: UserEntity; token: string } | string> {
    // 1️⃣ البحث عن المستخدم بالإيميل
    const user = await this.usersRepository.findOne({
      where: { email: singInDto.email },
      select: ['id', 'email', 'password'], // ← مهم جدًا
    });

    if (!user) {
      console.log('❌ No user found with email:', singInDto.email);
      return 'User not found';
    }

    console.log('✅ Found user:', user);

    // 2️⃣ التحقق من الباسورد
    const isPasswordValid = await this.verifyPassword(
      singInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      console.log('❌ Invalid password');
      return 'Invalid password';
    }

    const payload = { userId: user.id, email: user.email };
    const token = this.generateToken(payload);
    console.log('🎟️ Token generated successfully:', token);

    return { user, token };
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
}
