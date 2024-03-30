import { EntityMethodEnum, EntityRouteEnum } from '../../../enums/entity.enum';

export class CreateEntityDto {
  route: EntityRouteEnum;

  method: EntityMethodEnum;

  roles: string[];
}
