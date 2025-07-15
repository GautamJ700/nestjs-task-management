import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskdto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskservice: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskservice.getTask(filterDto);
  }
  @Get('/:id')
  getTaskByID(@Param('id') id: string): Promise<Task> {
    return this.taskservice.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskdto: CreateTaskdto): Promise<Task> {
    return this.taskservice.createTask(CreateTaskdto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.taskservice.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskservice.updateTaskStatus(id, status);
  }

  //   //Option one
  //   // @Post()
  //   // createTask(@Body() body){
  //   //     console.log('body',body);

  //   // }

  //   //Option two cherry pick the parameters
}
