import { IsString, IsEnum, IsOptional, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description?: string;

  @IsEnum(['pending', 'in-progress', 'completed'], {
    message: "Status must be either 'pending', 'in-progress', or 'completed'",
  })
  status: 'pending' | 'in-progress' | 'completed';

  @IsEnum(['high', 'medium', 'low'], {
    message: "Priority must be either 'high', 'medium', or 'low'",
  })
  priority: 'high' | 'medium' | 'low';
}
