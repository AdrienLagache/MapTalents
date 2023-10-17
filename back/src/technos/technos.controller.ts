import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Post,
  Patch,
} from '@nestjs/common';
import { TechnosService } from './technos.service';
import { Techno } from './entities/techno.entity';
import { CreateTechnosDto } from './dto/create-technos.dto';
import { UpdateTechnosDto } from './dto/update-technos.dto';

@Controller('api/technos')
export class TechnosController {
  constructor(private technosService: TechnosService) {}

  @Get()
  findAll(): Promise<Techno[]> {
    return this.technosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Techno | null> {
    return this.technosService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<{ deletedTechnos: number }> {
    return this.technosService.remove(id);
  }

  @Post()
  create(@Body() newTechno: CreateTechnosDto): Promise<Techno> {
    return this.technosService.create(newTechno);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() technoToUpdate: UpdateTechnosDto,
  ): Promise<Techno> {
    return this.technosService.update(id, technoToUpdate);
  }
}
