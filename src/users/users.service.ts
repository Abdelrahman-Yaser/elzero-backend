import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>) {}


async create(createUserDto: CreateUserDto): Promise<UserEntity> {
  const user = this.usersRepository.create(createUserDto);

  const findUser = await this.usersRepository.findOneBy({
    email: createUserDto.email,
  });

  if (findUser) {
    // NestJS هيرجع response زي:
    // { "statusCode": 409, "message": "User with this email already exists", "error": "Conflict" }
    throw new ConflictException('User with this email already exists');
  }

  try {
    return await this.usersRepository.save(user);
  } catch (error) {
    throw new InternalServerErrorException(`Error creating user: ${String(error)}`);
  }
}

  findAll(): Promise<UserEntity[]> {
    const users = this.usersRepository.find();
    return users;
  }

  findOne(id: number): Promise<UserEntity | null> {
    const user = this.usersRepository.findOneBy({ id });
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | string | undefined> {
    const user = await this.usersRepository.preload({ id, ...updateUserDto });
    if (!user) {
      return `User with ID ${id} not found`;
    }
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      return null;
    }
    await this.usersRepository.remove(user);
    return user;
  }
}
