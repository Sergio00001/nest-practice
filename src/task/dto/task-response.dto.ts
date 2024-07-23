import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
  @IsString()
  @ApiProperty({ example: 'Task Name' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Task Description' })
  description: string;

  @IsBoolean()
  @ApiProperty({ example: false })
  isCompleted: boolean;
}
