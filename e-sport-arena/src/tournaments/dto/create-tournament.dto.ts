import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsDateString, IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateTournamentDto {

    @ApiProperty({ description: "name", example: 'Olimpicos' })
    @IsString()
    @MinLength(6)
    name: string;

    @ApiProperty({ description: "The start date of the tournament with time", example: '2024-10-10T09:00:00' })
    @Type(() => Date)
    @IsDate({ message: 'startDate must be a valid date' })
    startDate: Date;

    @ApiProperty({ description: "The end date of the tournament with time", example: '2024-10-10T18:00:00' })
    @Type(() => Date)
    @IsDate({ message: 'endDate must be a valid date' })
    endDate: Date;
}

