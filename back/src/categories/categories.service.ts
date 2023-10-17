import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }
  findOne(id: number): Promise<Category | null> {
    return this.categoriesRepository.findOneByOrFail({ id });
  }

  async remove(id: number): Promise<{ deletedCategories: number }> {
    const categoryToDelete = await this.categoriesRepository.findOneBy({ id });

    if (!categoryToDelete) {
      throw new NotFoundException('Language not found');
    }

    await this.categoriesRepository.remove(categoryToDelete);

    const deletedCategories = 1;

    return { deletedCategories };
  }

  async create(category: CreateCategoriesDto): Promise<Category> {
    const newCategory = this.categoriesRepository.create(category);
    return this.categoriesRepository.save(newCategory);
  }

  async update(id: number, category: UpdateCategoriesDto): Promise<Category> {
    const categoryToUpdate = await this.categoriesRepository.findOneByOrFail({
      id,
    });

    if (!categoryToUpdate) {
      throw new NotFoundException('Category not found');
    }

    Object.assign(categoryToUpdate, category);

    return this.categoriesRepository.save(categoryToUpdate);
  }
}
