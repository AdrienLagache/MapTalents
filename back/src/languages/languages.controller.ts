import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { Language } from './entities/language.entity';
import { CreateLanguagesDto } from './dto/create-languages.dto';
import { UpdateLanguagesDto } from './dto/update-languages.dto';

@Controller('api/languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  findAll(): Promise<Language[]> {
    return this.languagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Language | null> {
    return this.languagesService.findOne(id);
  }

  @Post()
  create(@Body() newLanguage: CreateLanguagesDto): Promise<Language> {
    return this.languagesService.create(newLanguage);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() language: UpdateLanguagesDto,
  ): Promise<Language> {
    return this.languagesService.update(id, language);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<{ deletedlanguages: number }> {
    return this.languagesService.remove(id);
  }
}
