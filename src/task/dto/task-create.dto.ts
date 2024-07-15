import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskCreateDto {
  @IsString()
  @ApiProperty({ example: 'Get some eat' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'I wanna get some eat' })
  description: string;
}
