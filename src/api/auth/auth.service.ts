import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    const user = await this.dataSource.getRepository(User).findOne({
      where: { username: createAuthDto.username },
      relations: { role: true },
    });
    if (!user) throw new NotFoundException('User not found');
    // match the password
    const isMatched = await bcrypt.compare(
      createAuthDto.password,
      user.password,
    );
    if (!isMatched)
      throw new UnauthorizedException('Password or email is incorrect');
    const token = jwt.sign(
      {
        exp:
          Math.floor(Date.now() / 1000) +
          60 * 60 * +this.configService.get('JWT_EXPIRATION'), // 4h
        data: { username: user.username, id: user.id, role: user.role.id },
      },
      this.configService.get('JWT_SECRET'),
    );
    return token;
  }
}
