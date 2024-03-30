import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity as TypeOrmEntity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEnum } from '../../../enums/role.enum';
import { Permission } from '../../permissions/entities/permission.entity';
import { User } from '../../users/entities/user.entity';
import { Entity } from '../../entities/entities/entity.entity';

@TypeOrmEntity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, enum: RoleEnum })
  name: RoleEnum;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => Entity, (entity) => entity.roles, { onDelete: 'CASCADE' })
  entities: Entity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
