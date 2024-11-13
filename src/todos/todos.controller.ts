import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { TodoService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './interface/todo.interface';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() CreateTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(CreateTodoDto);
  }

  @Post("/findBy")
  filterByStatus(@Body('status') status?: string,
  @Body('priority') priority?: string): Promise<Todo[]> {
    return this.todoService.findBy(status, priority);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoService.update(id, UpdateTodoDto);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.todoService.find(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
