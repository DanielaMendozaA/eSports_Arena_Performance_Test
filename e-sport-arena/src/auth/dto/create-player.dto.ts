import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Rank } from 'src/players/enums/rank.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


export class CreatePlayerDto extends CreateUserDto {

    @ApiProperty({ description: 'GamerTag', example: 'Player123' })
    @IsString()
    gamerTag: string;
  
    @ApiProperty({ description: 'Rank', example: 'Silver' })
    @IsEnum(Rank)
    @IsOptional()
    rank?: Rank;
}

