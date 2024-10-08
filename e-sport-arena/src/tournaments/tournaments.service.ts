import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { DeleteResult, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>
  ) {
  }
  async create(createTournamentDto: CreateTournamentDto) {
    const { startDate, endDate } = createTournamentDto;

    this.validateDates(startDate, endDate);

    const newTornament = this.tournamentRepository.create(createTournamentDto)
    return await this.tournamentRepository.save(newTornament)

  }

  async findAll(paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;

    const [tournaments, total] = await this.tournamentRepository.findAndCount({
      skip: skip,
      take: take,
    });

    return {
      data: tournaments,
      totalItems: total,
      currentPage: Math.ceil(skip / take) + 1,
      totalPages: Math.ceil(total / take),
    };
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto) {
    const tournament = await this.tournamentRepository.findOne({ where: { id } });
    if (!tournament)
      throw new NotFoundException("Tournament not found")

    const { startDate, endDate } = updateTournamentDto;

    this.validateDates(startDate, endDate);

    return await this.tournamentRepository.update(id, updateTournamentDto)


  }

  async remove(id: number): Promise<DeleteResult> {
    const result: DeleteResult = await this.tournamentRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return result;
  }

  private validateDates(startDate: Date, endDate: Date): void {
    const currentDate = new Date();

    if (startDate >= endDate)
      throw new BadRequestException("The start date must be less than the end date ")

    if (startDate <= currentDate || endDate <= currentDate)
      throw new BadRequestException('startDate and endDate must be greater than the current date and time');
  }


}



