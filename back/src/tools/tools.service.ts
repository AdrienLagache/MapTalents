import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Tool } from './entities/tool.entity';
import { CreateToolsDto } from './dto/create-tools.dto';
import { UpdateToolsDto } from './dto/update-tools.dto';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tool)
    private toolsRepository: Repository<Tool>,
  ) {}

  findAll(): Promise<Tool[]> {
    return this.toolsRepository.find();
  }

  findOne(id: number): Promise<Tool | null> {
    return this.toolsRepository.findOneByOrFail({ id });
  }

  async findByName(tool: any): Promise<Tool | null> {
    const result = await this.toolsRepository.query(
      `SELECT * FROM tool WHERE BINARY tool = ?`,
      tool,
    );
    return result.length > 0 ? result[0] : null;
  }

  async remove(id: number): Promise<{ deletedTools: number }> {
    const toolToDelete = await this.toolsRepository.findOneBy({ id });

    if (!toolToDelete) {
      throw new NotFoundException('Tool not found');
    }

    await this.toolsRepository.remove(toolToDelete);
    const deletedTools = 1;

    return { deletedTools };
  }

  async create(tool: CreateToolsDto): Promise<Tool> {
    const existingTool = await this.findByName(tool.tool);

    if (existingTool === null) {
      const newTool = this.toolsRepository.create({ ...tool });
      const createdTool = await this.toolsRepository.save(newTool);
      return createdTool;
    }

    return existingTool;
  }

  async update(id: number, tool: UpdateToolsDto): Promise<Tool> {
    const toolToUpdate = await this.toolsRepository.findOneByOrFail({ id });

    if (!toolToUpdate) {
      throw new NotFoundException('Tool not found');
    }

    Object.assign(toolToUpdate, tool);

    return this.toolsRepository.save(toolToUpdate);
  }
}
