import { CreateAuthDto } from './dto/create-auth.dto';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly dataSource;
    private readonly configService;
    constructor(dataSource: DataSource, configService: ConfigService);
    login(createAuthDto: CreateAuthDto): Promise<string>;
}
