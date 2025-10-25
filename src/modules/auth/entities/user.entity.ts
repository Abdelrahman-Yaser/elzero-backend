import { Roles } from '../../../common/user-roles';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column()
  password!: string;

  // هنا: column مفرد من نوع enum مع default
  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.ADMIN,
  })
  role!: Roles;
}
