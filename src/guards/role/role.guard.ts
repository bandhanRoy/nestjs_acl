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

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const path = this.reflector.get(Path, context.getHandler());
    if (!path) {
      Logger.error('Path is required for role to work');
      throw new UnauthorizedException('Path is missing');
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const method = request.method.trim().toUpperCase();
    const roles = await this.dataSource.getRepository(Entity).findOne({
      relations: {
        roles: true,
      },
      where: {
        method,
        route: path,
      },
      select: {
        route: true,
        method: true,
        roles: {
          id: true,
        },
      },
    });
    console.log(roles);
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
