import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { DevsModule } from './devs/devs.module';
import { SoftSkillsModule } from './softskills/softskills.module';
import { TechnosModule } from './technos/technos.module';
import { LanguagesModule } from './languages/languages.module';
import { Techno } from './technos/entities/techno.entity';
import { Dev } from './devs/entities/dev.entity';
import { SoftSkill } from './softskills/entities/softskills.entity';
import { Language } from './languages/entities/language.entity';
import { Tool } from './tools/entities/tool.entity';
import { ToolsModule } from './tools/tools.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User, Dev, Techno, SoftSkill, Language, Tool, Category],
        synchronize: true,
        logging: ['query', 'error'],
      }),
    }),
    UsersModule,
    DevsModule,
    SoftSkillsModule,
    TechnosModule,
    ToolsModule,
    LanguagesModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {}
