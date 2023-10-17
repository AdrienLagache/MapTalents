import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Techno } from './entities/techno.entity';
import { CreateTechnosDto } from './dto/create-technos.dto';
import { UpdateTechnosDto } from './dto/update-technos.dto';

@Injectable()
export class TechnosService {
  constructor(
    @InjectRepository(Techno)
    private technosRepository: Repository<Techno>,
  ) {}

  findAll(): Promise<Techno[]> {
    return this.technosRepository.find();
  }

  findOne(id: number): Promise<Techno | null> {
    return this.technosRepository.findOneByOrFail({ id });
  }

  async remove(id: number): Promise<{ deletedTechnos: number }> {
    const technoToDelete = await this.technosRepository.findOneBy({ id });

    if (!technoToDelete) {
      throw new NotFoundException('User not found');
    }

    await this.technosRepository.remove(technoToDelete);
    const deletedTechnos = 1;

    return { deletedTechnos };
  }

  async create(techno: CreateTechnosDto): Promise<Techno> {
    const newTechno = this.technosRepository.create(techno);
    return this.technosRepository.save(newTechno);
  }

  async update(id: number, techno: UpdateTechnosDto): Promise<Techno> {
    const technoToUpdate = await this.technosRepository.findOneByOrFail({ id });

    if (!technoToUpdate) {
      throw new NotFoundException('Techno not found');
    }

    Object.assign(technoToUpdate, techno);

    return this.technosRepository.save(technoToUpdate);
  }
}
