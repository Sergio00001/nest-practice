import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskStatusUpdateDto {
  @IsBoolean()
  @ApiProperty({ example: false })
  isCompleted: boolean;
}
