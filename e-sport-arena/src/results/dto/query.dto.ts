import { IsOptional, IsString, IsIn, IsInt, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class FindResultsDto extends PaginationDto {
  
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  tournamentId?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  minPoints?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  maxPoints?: number;

  @IsOptional()
  @IsString()
  @IsIn(['winnerPoints', 'loserPoints'])
  orderBy?: string;
}
