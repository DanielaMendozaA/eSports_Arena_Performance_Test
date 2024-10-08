import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class CreateResultDto {

  @ApiProperty({ description: 'The points awarded to the winner', example: 10 })
  @IsInt()
  @IsPositive()
  winnerPoints: number;

  @ApiProperty({ description: 'The points awarded to the loser', example: 5 })
  @IsInt()
  @IsPositive()
  loserPoints: number;

  @ApiProperty({ description: 'The ID of the competition', example: 1 })
  @IsNotEmpty()
  @IsInt()
  competitionId: number;

  @ApiProperty({ description: 'The ID of the player who won', example: 'kshdfh' })
  @IsNotEmpty()
  @IsUUID()
  winnerId: string;

  @ApiProperty({ description: 'The ID of the player who lost', example: 'jisdfi' })
  @IsNotEmpty()
  @IsUUID()
  loserId: string;
}

