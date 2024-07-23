import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskStatusUpdateDto } from './dto/task-status-update.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { TaskResponseDto } from './dto/task-response.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiResponse({ status: 200, type: [TaskResponseDto] })
  async getAll(): Promise<{ success: true; data: TaskResponseDto[] }> {
    const data = await this.taskService.getAll();

    return {
      success: true,
      data: plainToInstance(TaskResponseDto, data),
    };
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: TaskResponseDto })
  async getTaskById(
    @Param('id') id: string,
  ): Promise<{ success: true; data: TaskResponseDto }> {
    const data = await this.taskService.getTaskById(id);

    return {
      success: true,
      data: plainToInstance(TaskResponseDto, data),
    };
  }

  @Post()
  @ApiResponse({ status: 201, type: TaskResponseDto })
  async create(
    @Body() dto: TaskCreateDto,
  ): Promise<{ success: true; data: TaskResponseDto }> {
    const newTask = await this.taskService.create(dto);

    return {
      success: true,
      data: plainToInstance(TaskResponseDto, newTask),
    };
  }

  @Patch(':id')
  @ApiResponse({ status: 200 })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: TaskStatusUpdateDto,
  ): Promise<{ success: true }> {
    await this.taskService.updateStatus(id, dto);

    return {
      success: true,
    };
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async deleteTask(@Param('id') id: string): Promise<{ success: true }> {
    await this.taskService.deleteTask(id);

    return {
      success: true,
    };
  }
}
