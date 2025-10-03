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
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>, // ✅ كده هيتعرف صح
    // private readonly jwtService: JwtService,
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
  // generateToken(payload: { userId: number; email: string }) {
  //   return this.jwtService.sign(payload);
  // }

  // // 🛠️ Verify Token
  // verifyToken(token: string): { [key: string]: any } {
  //   return this.jwtService.verify(token);
  // }

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
}
