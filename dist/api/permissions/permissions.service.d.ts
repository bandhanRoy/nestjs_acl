import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
export declare class PermissionsService {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    create(createPermissionDto: CreatePermissionDto): Promise<Permission>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePermissionDto: UpdatePermissionDto): string;
    remove(id: number): string;
}
