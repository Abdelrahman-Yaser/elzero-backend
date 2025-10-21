import { Roles } from '../../../common/user-roles';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  name!: string;
  @Column()
  email!: string;
  @Column()
  phoneNumber?: string;
  @Column()
  password!: string;
  @Column({
    type: 'enum',
    enum: Roles,
    array: true,
    default: [Roles.USER],
  })
  roles!: Roles[];
}
