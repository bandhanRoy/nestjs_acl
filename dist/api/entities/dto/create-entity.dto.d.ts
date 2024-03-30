import { EntityMethodEnum, EntityRouteEnum } from '../../../enums/entity.enum';
export declare class CreateEntityDto {
    route: EntityRouteEnum;
    method: EntityMethodEnum;
    roles: string[];
}
