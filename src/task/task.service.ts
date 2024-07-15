import { Injectable } from '@nestjs/common';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskStatusUpdateDto } from './dto/task-status-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async findTask(id: string) {
    return this.taskRepository.findOneOrFail({ where: { id } });
  }

  async getAll() {
    return this.taskRepository.find();
  }

  async getTaskById(id: string) {
    return this.findTask(id);
  }

  async create(dto: TaskCreateDto) {
    return this.taskRepository.save(dto);
  }

  async updateStatus(id: string, dto: TaskStatusUpdateDto) {
    return this.taskRepository.update(id, dto);
  }

  async deleteTask(id: string) {
    return this.taskRepository.softDelete(id);
  }
}
