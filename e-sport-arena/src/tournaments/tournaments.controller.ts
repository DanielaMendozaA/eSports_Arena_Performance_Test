import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { VerifyAuthService } from 'src/auth/decorators/verify-auth.decorator';
import { UserRoleEnum } from 'src/common/enums/roles.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Tournaments")
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @VerifyAuthService([UserRoleEnum.ADMIN])
  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto){
    return this.tournamentsService.create(createTournamentDto)
  } 

  @VerifyAuthService([UserRoleEnum.ADMIN, UserRoleEnum.PLAYER])
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.tournamentsService.findAll(paginationDto);
  }

  @VerifyAuthService([UserRoleEnum.ADMIN])
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTournamentDto: UpdateTournamentDto) {
    return await this.tournamentsService.update(id, updateTournamentDto);
  }

  @VerifyAuthService([UserRoleEnum.ADMIN])
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.tournamentsService.remove(id);
  }

}
