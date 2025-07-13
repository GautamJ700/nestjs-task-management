import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskdto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskservice: TasksService) {}

  //   @Get()
  //   getAllTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
  //     //if we have filter defined call taskservice.getTaskWithFilter
  //     // otherwise just get all task
  //     if (Object.keys(filterDto).length) {
  //       return this.taskservice.getTaskWithFilter(filterDto);
  //     } else {
  //       return this.taskservice.getAllTasks();
  //     }
  //   }
  @Get('/:id')
  getTaskByID(@Param('id') id: string): Promise<Task> {
    return this.taskservice.getTaskById(id);
  }

      @Post()
    createTask(@Body() CreateTaskdto: CreateTaskdto): Promise<Task> {
      return this.taskservice.createTask(CreateTaskdto);
}

  //   //Option one
  //   // @Post()
  //   // createTask(@Body() body){
  //   //     console.log('body',body);

  //   // }

  //   //Option two cherry pick the parameters


  //   @Delete('/:id')
  //   deleteTaskById(@Param('id') id: string): void {
  //     return this.taskservice.deleteTaskById(id);
  //   }

  //   @Patch('/:id/status')
  //   updateTaskStatus(
  //     @Param('id') id: string,
  //     @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  //   ): Task {
  //     const { status } = updateTaskStatusDto;
  //     return this.taskservice.updateTaskStatus(id, status);
  //   }
}
