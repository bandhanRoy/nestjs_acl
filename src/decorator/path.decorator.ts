import { Reflector } from '@nestjs/core';
import { EntityRouteEnum } from '../enums/entity.enum';

export const Path = Reflector.createDecorator<EntityRouteEnum>();
