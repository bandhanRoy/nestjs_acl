import { Injectable } from '@nestjs/common';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Entity } from './entities/entity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(Entity)
    private readonly entityRepository: Repository<Entity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createEntityDto: CreateEntityDto) {
    const entity = new Entity();
    entity.route = createEntityDto.route;
    entity.method = createEntityDto.method;
    entity.roles = await this.dataSource
      .getRepository(Role)
      .find({ where: createEntityDto.roles.map((id) => ({ id })) });
    return this.entityRepository.save(entity);
  }

  findAll() {
    return `This action returns all entities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entity`;
  }

  update(id: number, updateEntityDto: UpdateEntityDto) {
    return `This action updates a #${id} entity`;
  }

  remove(id: number) {
    return `This action removes a #${id} entity`;
  }
}
