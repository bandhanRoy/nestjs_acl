import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Entity as TypeOrmEntity,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from '../../permissions/entities/permission.entity';
import { EntityMethodEnum, EntityRouteEnum } from '../../../enums/entity.enum';
import { Role } from '../../roles/entities/role.entity';

@TypeOrmEntity()
@Unique(['route', 'method'])
export class Entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: EntityRouteEnum })
  route: EntityRouteEnum;

  @Column({ enum: EntityRouteEnum })
  method: EntityMethodEnum;

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    onDelete: 'CASCADE',
  })
  permissions: Permission[];

  @ManyToMany(() => Role, (role) => role.entities)
  @JoinTable()
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
