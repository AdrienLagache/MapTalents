import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TechnosService } from 'src/technos/technos.service';
import { UsersService } from 'src/users/users.service';
import { LanguagesService } from 'src/languages/languages.service';
import { SoftSkillsService } from 'src/softskills/softskills.service';
import { ToolsService } from 'src/tools/tools.service';
import { Repository } from 'typeorm';
import { CreateDevsDto } from './dto/create-devs.dto';
import { UpdateDevsDto } from './dto/update-devs.dto';
import { Dev } from './entities/dev.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { FilterDevsDto } from './dto/filter-devs.dto';

@Injectable()
export class DevsService {
  constructor(
    @InjectRepository(Dev)
    private devsRepository: Repository<Dev>,
    private usersService: UsersService,
    private technosService: TechnosService,
    private languagesService: LanguagesService,
    private softSkillsService: SoftSkillsService,
    private toolsService: ToolsService,
    private categoriesService: CategoriesService,
  ) {}

  async findAll(): Promise<Dev[]> {
    return await this.devsRepository.find({
      relations: {
        user: true,
        techno: true,
        language: true,
        softSkill: true,
        tool: true,
        category: true,
      },
    });
  }

  async findWithFilters(filters: FilterDevsDto): Promise<Dev[]> {
    const queryBuilder = this.devsRepository
      .createQueryBuilder('dev')
      .leftJoinAndSelect('dev.user', 'user')
      .leftJoinAndSelect('dev.category', 'category')
      .leftJoinAndSelect('dev.techno', 'techno')
      .leftJoinAndSelect('dev.language', 'language')
      .leftJoinAndSelect('dev.softSkill', 'softSkill')
      .leftJoinAndSelect('dev.tool', 'tool');
    if (
      filters.longitude &&
      filters.latitude &&
      filters.longitude !== null &&
      filters.latitude !== null
    ) {
      // 1 degré de longitude = 111.11 Km x cos(latitude)
      // 1 degré de latitude = 111.11 Km env en France

      queryBuilder.andWhere(
        'dev.longitude <= :longitude + dev.activity_area / (111.11 * cos((PI() / 180) * :latitude))',
        {
          longitude: filters.longitude,
          latitude: filters.latitude,
        },
      );
      queryBuilder.andWhere(
        'dev.longitude >= :longitude - dev.activity_area / (111.11 * cos((PI() / 180) * :latitude))',
        {
          longitude: filters.longitude,
          latitude: filters.latitude,
        },
      );
      queryBuilder.andWhere(
        'dev.latitude <= :latitude + dev.activity_area / 111.11',
        {
          latitude: filters.latitude,
        },
      );
      queryBuilder.andWhere(
        'dev.latitude >= :latitude - dev.activity_area / 111.11',
        {
          latitude: filters.latitude,
        },
      );
    }
    if (filters.availability && filters.availability !== '') {
      queryBuilder.andWhere('dev.availability = "Disponible"');
    }
    if (filters.adr) {
      if (filters.adr[0] !== 200) {
        queryBuilder.andWhere('dev.adr >= :adrMin', { adrMin: filters.adr[0] });
      }
      if (filters.adr[1] !== 900) {
        queryBuilder.andWhere('dev.adr <= :adrMax', { adrMax: filters.adr[1] });
      }
    }
    if (filters.experience && filters.experience.length > 0) {
      const numericExperience = filters.experience.map((rangeString) =>
        rangeString
          .replace('to', ',')
          .split(',')
          .map((str) => parseInt(str)),
      );

      const experienceConditions = numericExperience.map(
        ([minExperience, maxExperience]) => {
          const currentDate = new Date();
          const minExperienceDate = new Date(currentDate);
          minExperienceDate.setFullYear(
            minExperienceDate.getFullYear() - maxExperience,
          );

          const maxExperienceDate = new Date(currentDate);
          if (maxExperience) {
            maxExperienceDate.setFullYear(
              maxExperienceDate.getFullYear() - minExperience,
            );
          }

          const minExperienceDateString = minExperienceDate.toISOString();
          const maxExperienceDateString = maxExperienceDate.toISOString();

          return `dev.experience >= '${minExperienceDateString}' AND dev.experience <= '${maxExperienceDateString}'`;
        },
      );

      const experienceWhereClause = experienceConditions.join(' OR ');
      if (experienceWhereClause) {
        queryBuilder.andWhere(`(${experienceWhereClause})`);
      }
    }
    if (filters.technos && filters.technos.length > 0) {
      filters.technos.forEach((technoId, index) => {
        const alias = `tech${index}`;
        queryBuilder.innerJoin(
          'dev.techno',
          alias,
          `${alias}.id = :technoId${index}`,
          { [`technoId${index}`]: technoId },
        );
      });
    }
    if (filters.languages && filters.languages.length > 0) {
      filters.languages.forEach((languageId, index) => {
        const alias = `lang${index}`;
        queryBuilder.innerJoin(
          'dev.language',
          alias,
          `${alias}.id = :languageId${index}`,
          { [`languageId${index}`]: languageId },
        );
      });
    }
    if (filters.categories && filters.categories.length > 0) {
      const categoryConditions = filters.categories.map((categoryId, index) => {
        const alias = `cat${index}`;
        queryBuilder.leftJoin(
          'dev.category',
          alias,
          `${alias}.id = :categoryId${index}`,
          { [`categoryId${index}`]: categoryId },
        );
        return `${alias}.id = :categoryId${index}`;
      });

      queryBuilder.andWhere(
        categoryConditions.join(' OR '),
        filters.categories.reduce(
          (acc, categoryId, index) => ({
            ...acc,
            [`categoryId${index}`]: categoryId,
          }),
          {},
        ),
      );
    }

    if (filters.remote && filters.remote !== 'Télétravail / Sur site') {
      queryBuilder.andWhere('dev.remote = :remote', { remote: filters.remote });
    }

    const filteredDevs = await queryBuilder.getMany();
    return filteredDevs;
  }

  async findOne(id: number): Promise<Dev | null> {
    const dev = await this.devsRepository
      .createQueryBuilder('dev')
      .leftJoinAndSelect('dev.user', 'user')
      .leftJoinAndSelect('dev.category', 'category')
      .leftJoinAndSelect('dev.techno', 'techno')
      .leftJoinAndSelect('dev.language', 'language')
      .leftJoinAndSelect('dev.softSkill', 'softSkill')
      .leftJoinAndSelect('dev.tool', 'tool')
      .where('dev.id = :id', { id })
      .getOne();

    if (!dev) {
      throw new NotFoundException('Dev not found');
    }

    return dev || null;
  }

  async findByUserId(userId: number): Promise<Dev | null> {
    const dev = await this.devsRepository
      .createQueryBuilder('dev')
      .leftJoinAndSelect('dev.user', 'user')
      .leftJoinAndSelect('dev.category', 'category')
      .leftJoinAndSelect('dev.techno', 'techno')
      .leftJoinAndSelect('dev.language', 'language')
      .leftJoinAndSelect('dev.softSkill', 'softSkill')
      .leftJoinAndSelect('dev.tool', 'tool')
      .where('dev.userId = :userId', { userId })
      .getOne();

    if (!dev) {
      throw new NotFoundException('Dev not found');
    }

    return dev || null;
  }

  async remove(id: number): Promise<{ deletedDevs: number }> {
    const devToDelete = await this.findOne(id);
    if (!devToDelete) {
      throw new NotFoundException('Dev not found');
    }
    console.log(devToDelete);

    const userToDelete = await this.usersService.findOne(devToDelete.user.id);

    await this.devsRepository.remove(devToDelete);
    await this.usersService.remove(userToDelete.id);

    const deletedDevs = 1;

    return { deletedDevs };
  }

  async create(dev: CreateDevsDto): Promise<Dev> {
    const category = await this.categoriesService.findOne(dev.categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const newDev = this.devsRepository.create({
      ...dev,
      category: category,
      user: { id: dev.userId },
      techno: dev.technoId.map((technoId) => ({ id: technoId })),
      language: dev.languageId.map((languageId) => ({ id: languageId })),
      softSkill: dev.softSkillId.map((softSkillId) => ({ id: softSkillId })),
      tool: dev.toolId.map((toolId) => ({ id: toolId })),
    });

    return this.devsRepository.save(newDev);
  }

  async update(id: number, dev: UpdateDevsDto): Promise<Dev> {
    const devToUpdate = await this.devsRepository.findOneBy({ id });

    if (!devToUpdate) {
      throw new NotFoundException('Dev not found');
    }

    if (dev.userId) {
      const newUser = await this.usersService.findOne(dev.userId);

      if (!newUser) {
        throw new NotFoundException('User not found');
      }

      devToUpdate.user = newUser;
    }

    if (dev.userId) {
      devToUpdate.user.id = dev.userId;
    }

    if (dev.categoryId) {
      const newCategory = await this.categoriesService.findOne(dev.categoryId);
      if (!newCategory) {
        throw new NotFoundException('Category not found');
      }

      devToUpdate.category = newCategory;
    }

    if (dev.technoId) {
      const newTechnosPromises = dev.technoId.map(async (id) =>
        this.technosService.findOne(id),
      );
      const newTechnos = await Promise.all(newTechnosPromises);

      devToUpdate.techno = newTechnos;
    }
    if (dev.languageId) {
      const newLanguagesPromises = dev.languageId.map(async (id) =>
        this.languagesService.findOne(id),
      );
      const newLanguage = await Promise.all(newLanguagesPromises);

      devToUpdate.language = newLanguage;
    }
    if (dev.softSkillId) {
      const newSoftSkillsPromises = dev.softSkillId.map(async (id) =>
        this.softSkillsService.findOne(id),
      );
      const newSoftSkill = await Promise.all(newSoftSkillsPromises);

      devToUpdate.softSkill = newSoftSkill;
    }
    if (dev.toolId) {
      const newToolPromises = dev.toolId.map(async (id) =>
        this.toolsService.findOne(id),
      );
      const newTool = await Promise.all(newToolPromises);

      devToUpdate.tool = newTool;
    }

    Object.assign(devToUpdate, dev);

    return this.devsRepository.save(devToUpdate);
  }
}
