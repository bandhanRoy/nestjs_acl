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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(dataSource, configService) {
        this.dataSource = dataSource;
        this.configService = configService;
    }
    async login(createAuthDto) {
        const user = await this.dataSource.getRepository(user_entity_1.User).findOne({
            where: { username: createAuthDto.username },
            relations: { role: true },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isMatched = await bcrypt.compare(createAuthDto.password, user.password);
        if (!isMatched)
            throw new common_1.UnauthorizedException('Password or email is incorrect');
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) +
                60 * 60 * +this.configService.get('JWT_EXPIRATION'),
            data: { username: user.username, id: user.id, role: user.role.id },
        }, this.configService.get('JWT_SECRET'));
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map