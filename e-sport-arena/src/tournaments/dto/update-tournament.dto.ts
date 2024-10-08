import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTournamentDto } from './create-tournament.dto';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class UpdateTournamentDto{
    @ApiProperty({ description: "The start date of the tournament with time", example: '2024-10-10T09:00:00' })
    @Type(() => Date)
    @IsDate({ message: 'startDate must be a valid date' })
    startDate: Date;

    @ApiProperty({ description: "The end date of the tournament with time", example: '2024-10-10T18:00:00' })
    @Type(() => Date)
    @IsDate({ message: 'endDate must be a valid date' })
    endDate: Date;


}
