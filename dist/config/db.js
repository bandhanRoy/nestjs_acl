"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const typeOrmConfig = (configService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
    logging: configService.get('DB_LOGGING') === 'true',
    autoLoadEntities: true,
    entities: [],
    subscribers: [],
    migrations: [],
});
exports.typeOrmConfig = typeOrmConfig;
//# sourceMappingURL=db.js.map