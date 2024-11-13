import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [DatabaseModule,TodosModule], // Import the DatabaseModule here
})
export class AppModule {}
