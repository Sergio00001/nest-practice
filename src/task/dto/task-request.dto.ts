import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class TaskRequestDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) =>
    value === 'true' || value === 'false' ? value === 'true' : value,
  )
  isCompleted?: boolean;

  @IsOptional()
  @IsString()
  name?: string;
}
