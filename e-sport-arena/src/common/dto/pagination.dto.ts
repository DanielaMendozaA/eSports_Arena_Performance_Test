import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ description: 'Number of items to skip', default: 0 })
  @IsOptional()
  @Min(0)
  skip: number = 0;

  @ApiProperty({ description: 'Number of items to take', default: 10 })
  @IsOptional()
  @IsPositive()
  take: number = 10;
}
