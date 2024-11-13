import { Injectable, Inject } from '@nestjs/common';
import { Todo } from './interface/todo.interface';
import * as nano from 'nano';

@Injectable()
export class TodoService {
  private todoDb: nano.DocumentScope<Todo>;

  constructor(@Inject('COUCHDB_CONNECTION') private couch: nano.ServerScope) {
    this.todoDb = this.couch.db.use('todos'); // Use the "todos" database
  }

  // Create a new todo
  async create(todo: Todo): Promise<Todo> {
    const response = await this.todoDb.insert(todo);
    return { ...todo, id: response.id }; // Include the id from CouchDB response
  }

  // Get all todos
  async findAll(): Promise<Todo[]> {
    const result = await this.todoDb.find({ selector: {} }); // Return all docs
    return result.docs as Todo[];
  }

  // Find a todo by id
  async find(id: string): Promise<Todo> {
    try {
      const todo = await this.todoDb.get(id);
      return todo as Todo;
    } catch (error) {
      throw new Error(`Todo with id ${id} not found`);
    }
  }

  async findBy(status?: string, priority?: string): Promise<Todo[]> {
    const selector: any = {};
    if (status) {
      selector.status = status;
    }
    if (priority) {
      selector.priority = priority;
    }
    const result = await this.todoDb.find({ selector });
    return result.docs as Todo[];
  }

  // Update a todo by id
  async update(id: string, updatedTodo: Partial<Todo>): Promise<Todo | undefined> {
    try {
      const existingTodo = await this.todoDb.get(id);
      const updated = { ...existingTodo, ...updatedTodo, updatedAt: new Date() };
      const response = await this.todoDb.insert(updated);
      return response as unknown as Todo;
    } catch (error) {
      throw new Error(`Todo with id ${id} not found`);
    }
  }

  // Remove a todo by id
  async remove(id: string): Promise<void> {
    try {
      const todo = await this.todoDb.get(id);
      await this.todoDb.destroy(todo._id, todo._rev); // Requires _id and _rev for deletion
    } catch (error) {
      throw new Error(`Todo with id ${id} not found`);
    }
  }
}
