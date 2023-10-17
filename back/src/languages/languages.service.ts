import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { CreateLanguagesDto } from './dto/create-languages.dto';
import { UpdateLanguagesDto } from './dto/update-languages.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languagesRepository: Repository<Language>,
  ) {}

  findAll(): Promise<Language[]> {
    return this.languagesRepository.find();
  }

  findOne(id: number): Promise<Language | null> {
    return this.languagesRepository.findOneByOrFail({ id });
  }

  async remove(id: number): Promise<{ deletedlanguages: number }> {
    const languageToDelete = await this.languagesRepository.findOneBy({ id });

    if (!languageToDelete) {
      throw new NotFoundException('Language not found');
    }

    await this.languagesRepository.remove(languageToDelete);

    const deletedlanguages = 1;

    return { deletedlanguages };
  }

  async create(language: CreateLanguagesDto): Promise<Language> {
    const newLanguage = this.languagesRepository.create(language);
    return this.languagesRepository.save(newLanguage);
  }

  async update(id: number, language: UpdateLanguagesDto): Promise<Language> {
    const languageToUpdate = await this.languagesRepository.findOneByOrFail({
      id,
    });

    if (!languageToUpdate) {
      throw new NotFoundException('Language not found');
    }

    Object.assign(languageToUpdate, language);

    return this.languagesRepository.save(languageToUpdate);
  }
}
