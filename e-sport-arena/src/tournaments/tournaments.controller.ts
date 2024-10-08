import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto){
    return this.tournamentsService.create(createTournamentDto)
  } 

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.tournamentsService.findAll(paginationDto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTournamentDto: UpdateTournamentDto) {
    return await this.tournamentsService.update(id, updateTournamentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.tournamentsService.remove(id);
  }

}
