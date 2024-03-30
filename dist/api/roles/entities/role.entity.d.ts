import { RoleEnum } from '../../../enums/role.enum';
import { Permission } from '../../permissions/entities/permission.entity';
import { User } from '../../users/entities/user.entity';
import { Entity } from '../../entities/entities/entity.entity';
export declare class Role {
    id: string;
    name: RoleEnum;
    permissions: Permission[];
    users: User[];
    entities: Entity[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
