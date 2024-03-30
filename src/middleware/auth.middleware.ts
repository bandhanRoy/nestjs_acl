import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserTokenPayload } from '../types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, this.configService.get('JWT_SECRET'));
      if (!decoded)
        throw new UnauthorizedException('Not authorized to access endpoint');
      req['user'] = decoded as UserTokenPayload;
    } catch (error) {
      Logger.error('Error occurred while validating token', error);
      if (error instanceof jwt.JsonWebTokenError) {
        throw new InternalServerErrorException(
          'Something went wrong while validating token',
        );
      } else
        throw new UnauthorizedException('Not authorized to access endpoint');
    }
    next();
  }
}
