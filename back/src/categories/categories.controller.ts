import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Post,
  Patch,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Category | null> {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() newCategory: CreateCategoriesDto): Promise<Category> {
    return this.categoriesService.create(newCategory);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() language: UpdateCategoriesDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, language);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<{ deletedCategories: number }> {
    return this.categoriesService.remove(id);
  }
}
