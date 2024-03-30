import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Entity } from './entities/entity.entity';
import { DataSource, Repository } from 'typeorm';
export declare class EntitiesService {
    private readonly entityRepository;
    private readonly dataSource;
    constructor(entityRepository: Repository<Entity>, dataSource: DataSource);
    create(createEntityDto: CreateEntityDto): Promise<Entity>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEntityDto: UpdateEntityDto): string;
    remove(id: number): string;
}
