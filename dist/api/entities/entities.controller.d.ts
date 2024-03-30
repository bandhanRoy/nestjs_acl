import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
export declare class EntitiesController {
    private readonly entitiesService;
    constructor(entitiesService: EntitiesService);
    create(createEntityDto: CreateEntityDto): Promise<import("src/api/entities/entities/entity.entity").Entity>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEntityDto: UpdateEntityDto): string;
    remove(id: string): string;
}
