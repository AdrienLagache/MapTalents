import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { SoftSkill } from './entities/softskills.entity';
import { CreateSoftSkillsDto } from './dto/create-softkills.dto';
import { UpdateSoftSkillsDto } from './dto/update-softkills.dto';

@Injectable()
export class SoftSkillsService {
  constructor(
    @InjectRepository(SoftSkill)
    private softSkillsRepository: Repository<SoftSkill>,
  ) {}

  findAll(): Promise<SoftSkill[]> {
    return this.softSkillsRepository.find();
  }

  findOne(id: number): Promise<SoftSkill | null> {
    return this.softSkillsRepository.findOneByOrFail({ id });
  }

  async findByName(softSkill: any): Promise<SoftSkill | null> {
    const result = await this.softSkillsRepository.query(
      `SELECT * FROM soft_skill WHERE BINARY softSkill = ?`,
      softSkill,
    );
    return result.length > 0 ? result[0] : null;
  }

  async remove(id: number): Promise<{ deletedSoftSkills: number }> {
    const softSkillToDelete = await this.softSkillsRepository.findOneBy({ id });

    if (!softSkillToDelete) {
      throw new NotFoundException('SoftSkill not found');
    }

    await this.softSkillsRepository.remove(softSkillToDelete);

    const deletedSoftSkills = 1;

    return { deletedSoftSkills };
  }

  async create(softSkill: CreateSoftSkillsDto): Promise<SoftSkill> {
    const existingSoftSkill = await this.findByName(softSkill.softSkill);

    if (existingSoftSkill === null) {
      const newSoftSkill = this.softSkillsRepository.create(softSkill);
      return this.softSkillsRepository.save(newSoftSkill);
    }

    return existingSoftSkill;
  }

  async update(id: number, softSkill: UpdateSoftSkillsDto): Promise<SoftSkill> {
    const softSkillToUpdate = await this.softSkillsRepository.findOneByOrFail({
      id,
    });

    if (!softSkillToUpdate) {
      throw new NotFoundException('Softskill not found');
    }

    Object.assign(softSkillToUpdate, softSkill);

    return this.softSkillsRepository.save(softSkillToUpdate);
  }
}
