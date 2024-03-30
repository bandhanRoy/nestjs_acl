import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { DataSource, Repository } from 'typeorm';
export declare class RolesService {
    private readonly roleRepository;
    private readonly dataSource;
    constructor(roleRepository: Repository<Role>, dataSource: DataSource);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRoleDto: UpdateRoleDto): string;
    remove(id: number): string;
}
