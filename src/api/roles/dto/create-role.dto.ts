import { RoleEnum } from '../../../enums/role.enum';

export class CreateRoleDto {
  name: RoleEnum;

  permissions: string[];
}
