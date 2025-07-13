import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskdto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';
import { Task } from './task.entity';
import { TaskStatus } from './task.status-enum';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository : TaskRepository
  ){}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = this.tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //    tasks = this.tasks.filter((task) => {
  //     if (task.title.includes(search) || task.description.includes(search)){
  //       return true;
  //     }
  //     return false;
  //    });
  //   }
  //   return tasks;
  // }
async getTaskById(id: string): Promise<Task> {
  const found = await this.taskRepository.findOne({ where: { id } });
  if (!found) {
    throw new NotFoundException(`Task with id ${id} not found`);
  }
  return found;
}

 async createTask(createTaskdto: CreateTaskdto): Promise<Task> {
    const { title, description } = createTaskdto;
    
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.taskRepository.save(task);

    return task;
  }

  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
