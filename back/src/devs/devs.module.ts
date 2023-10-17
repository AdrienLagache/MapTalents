import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevsController } from './devs.controller';
import { DevsService } from './devs.service';
import { UsersService } from 'src/users/users.service';
import { Dev } from './entities/dev.entity';
import { User } from 'src/users/entities/user.entity';
import { TechnosService } from 'src/technos/technos.service';
import { Techno } from 'src/technos/entities/techno.entity';
import { Language } from 'src/languages/entities/language.entity';
import { SoftSkill } from 'src/softskills/entities/softskills.entity';
import { Tool } from 'src/tools/entities/tool.entity';
import { LanguagesService } from 'src/languages/languages.service';
import { SoftSkillsService } from 'src/softskills/softskills.service';
import { ToolsService } from 'src/tools/tools.service';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Dev,
      User,
      Techno,
      Language,
      SoftSkill,
      Tool,
      Category,
    ]),
  ],
  controllers: [DevsController],
  providers: [
    DevsService,
    UsersService,
    TechnosService,
    LanguagesService,
    SoftSkillsService,
    ToolsService,
    CategoriesService,
  ],
})
export class DevsModule {}
