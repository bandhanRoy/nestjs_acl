"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
const entity_entity_1 = require("../../api/entities/entities/entity.entity");
const role_decorator_1 = require("../../decorator/role.decorator");
let RoleGuard = class RoleGuard {
    constructor(reflector, dataSource) {
        this.reflector = reflector;
        this.dataSource = dataSource;
    }
    async canActivate(context) {
        console.log('In here');
        const path = await this.reflector.get(role_decorator_1.Role, context.getHandler());
        console.log(path);
        if (!path) {
            common_1.Logger.error('Path is required for role to work');
            throw new common_1.UnauthorizedException('Path is missing');
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const method = request.method.trim().toUpperCase();
        const roles = await this.dataSource.getRepository(entity_entity_1.Entity).findOne({
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
            common_1.Logger.log('Role not defined for the route but guard was added to this route');
            return true;
        }
        if (!roles.roles.find((role) => role.id === user.role)) {
            common_1.Logger.log('Role mismatch');
            throw new common_1.UnauthorizedException('Not authorized to access endpoint');
        }
        return true;
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_1.DataSource])
], RoleGuard);
//# sourceMappingURL=path.guard.js.map