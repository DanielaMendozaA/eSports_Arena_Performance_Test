import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsDateString, IsEmail, IsInt, IsPositive, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateCompetitionDto {

    @ApiProperty({ description: "The match date of the competition with time", example: '2024-10-10T09:00:00' })
    @Type(() => Date)
    @IsDate({ message: 'startDate must be a valid date' })
    matchDate: Date;

    @ApiProperty({
        description: "The ID of the tournament the competition belongs to",
        example: 1,
      })
    @IsInt()
    @IsPositive()
    tournamentId: number;
  
}

