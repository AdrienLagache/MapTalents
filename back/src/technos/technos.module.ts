import { Module } from '@nestjs/common';
import { TechnosController } from './technos.controller';
import { TechnosService } from './technos.service';
import { Techno } from './entities/techno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Techno])],
  controllers: [TechnosController],
  providers: [TechnosService],
})
export class TechnosModule {}
