import { IsString, IsEnum, IsOptional, IsDate } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['pending', 'in-progress', 'completed'], {
    message: "Status must be either 'pending', 'in-progress', or 'completed'",
  })
  status?: 'pending' | 'in-progress' | 'completed';

  @IsOptional()
  @IsEnum(['high', 'medium', 'low'], {
    message: "Priority must be either 'high', 'medium', or 'low'",
  })
  priority?: 'high' | 'medium' | 'low';

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
