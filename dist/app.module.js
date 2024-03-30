"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auth_module_1 = require("./api/auth/auth.module");
const entities_module_1 = require("./api/entities/entities.module");
const permissions_module_1 = require("./api/permissions/permissions.module");
const products_module_1 = require("./api/products/products.module");
const roles_module_1 = require("./api/roles/roles.module");
const users_module_1 = require("./api/users/users.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const db_1 = require("./config/db");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            permissions_module_1.PermissionsModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => (0, db_1.typeOrmConfig)(configService),
                dataSourceFactory: async (options) => {
                    const dataSource = await new typeorm_2.DataSource(options).initialize();
                    return dataSource;
                },
            }),
            roles_module_1.RolesModule,
            entities_module_1.EntitiesModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map