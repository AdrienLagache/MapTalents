import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DevsService } from './devs.service';
import { CreateDevsDto } from './dto/create-devs.dto';
import { FilterDevsDto } from './dto/filter-devs.dto';
import { Dev } from './entities/dev.entity';

@Controller('api/devs')
export class DevsController {
  constructor(private readonly devsService: DevsService) {}

  @Get()
  findAll(): Promise<Dev[]> {
    return this.devsService.findAll();
  }

  @Post('filters')
  findWithFilter(@Body() filters: FilterDevsDto): Promise<Dev[]> {
    return this.devsService.findWithFilters(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Dev | null> {
    return this.devsService.findOne(id);
  }

  @Get('/userId/:id')
  findByUserId(@Param('id') id: number): Promise<Dev | null> {
    return this.devsService.findByUserId(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<{ deletedDevs: number }> {
    return this.devsService.remove(id);
  }

  @Post()
  create(@Body() newDev: CreateDevsDto): Promise<Dev> {
    return this.devsService.create(newDev);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dev: CreateDevsDto): Promise<Dev> {
    return this.devsService.update(id, dev);
  }
}
