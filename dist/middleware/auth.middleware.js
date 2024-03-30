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
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt = require("jsonwebtoken");
let AuthMiddleware = class AuthMiddleware {
    constructor(configService) {
        this.configService = configService;
    }
    use(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, this.configService.get('JWT_SECRET'));
            if (!decoded)
                throw new common_1.UnauthorizedException('Not authorized to access endpoint');
            req['user'] = decoded;
        }
        catch (error) {
            common_1.Logger.error('Error occurred while validating token', error);
            if (error instanceof jwt.JsonWebTokenError) {
                throw new common_1.InternalServerErrorException('Something went wrong while validating token');
            }
            else
                throw new common_1.UnauthorizedException('Not authorized to access endpoint');
        }
        next();
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map