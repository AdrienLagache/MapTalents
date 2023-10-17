import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { Tool } from './entities/tool.entity';
import { CreateToolsDto } from './dto/create-tools.dto';
import { UpdateToolsDto } from './dto/update-tools.dto';

@Controller('api/tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get()
  findAll(): Promise<Tool[]> {
    return this.toolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tool | null> {
    return this.toolsService.findOne(id);
  }

  @Get('name/:tool')
  findByName(@Param('tool') tool: string): Promise<Tool | null> {
    return this.toolsService.findByName(tool);
  }

  @Post()
  create(@Body() newTool: CreateToolsDto): Promise<Tool> {
    const createdTool = this.toolsService.create(newTool);
    return createdTool;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() tool: UpdateToolsDto): Promise<Tool> {
    return this.toolsService.update(id, tool);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<{ deletedTools: number }> {
    return this.toolsService.remove(id);
  }
}
