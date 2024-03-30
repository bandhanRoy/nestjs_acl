import { Permission } from '../../permissions/entities/permission.entity';
import { EntityMethodEnum, EntityRouteEnum } from '../../../enums/entity.enum';
import { Role } from '../../roles/entities/role.entity';
export declare class Entity {
    id: string;
    route: EntityRouteEnum;
    method: EntityMethodEnum;
    permissions: Permission[];
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
