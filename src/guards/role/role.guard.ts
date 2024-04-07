import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { Entity } from '../../api/entities/entities/entity.entity';
import { Path } from '../../decorator/path.decorator';
import { EntityMethodEnum, EntityRouteEnum } from '../../enums/entity.enum';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const path = this.reflector.getAllAndOverride<EntityRouteEnum>(Path, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!path) {
      Logger.error('Path is required for role to work');
      throw new UnauthorizedException('Path is missing');
    }
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    const method = request.method.trim().toUpperCase() as EntityMethodEnum;
    const roles = await this.dataSource.getRepository(Entity).findOne({
      relations: {
        roles: true,
      },
      where: {
        method,
        route: path,
      },
      select: {
        id: true,
        route: true,
        method: true,
        roles: {
          id: true,
        },
      },
    });
    if (!roles) {
      Logger.log(
        'Role not defined for the route but guard was added to this route',
      );
      return true;
    }
    if (!roles.roles.find((role) => role.id === user.role)) {
      Logger.log('Role mismatch');
      throw new UnauthorizedException('Not authorized to access endpoint');
    }
    return true;
  }
}
