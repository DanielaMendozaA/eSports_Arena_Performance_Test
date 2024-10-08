import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResultDto } from './dto/create-result.dto';
import { Result } from './entities/result.entity';
import { Competition } from 'src/competitions/entities/competition.entity';
import { Player } from 'src/players/entities/player.entity';
import { FindResultsDto } from './dto/query.dto';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    @InjectRepository(Competition)
    private readonly competitionRepository: Repository<Competition>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createResultDto: CreateResultDto) {
    const { winnerId, loserId, competitionId, winnerPoints, loserPoints } = createResultDto;

    const competition = await this.competitionRepository.findOne({
      where: { id: competitionId },
      relations: ['players'], 
    });
    if (!competition) {
      throw new NotFoundException(`Competition with ID ${competitionId} not found`);
    }
    const winner = competition.players.find(player => player.id === winnerId);
    if (!winner) {
      throw new BadRequestException(`Player with ID ${winnerId} is not part of the competition ${competitionId}`);
    }

    const loser = competition.players.find(player => player.id === loserId);
    if (!loser) {
      throw new BadRequestException(`Player with ID ${loserId} is not part of the competition ${competitionId}`);
    }

    if (winnerId === loserId) {
      throw new BadRequestException('Winner and loser cannot be the same player');
    }

    const newResult = this.resultRepository.create({
      winnerPoints,
      loserPoints,
      competition,
      winner,
      loser,
    });
    return await this.resultRepository.save(newResult);
  }

  async findAll(queryParams: FindResultsDto) {
    const {
      skip = 0,
      take = 10,
      tournamentId,
      minPoints,
      maxPoints,
      orderBy = 'winnerPoints', 
    } = queryParams;

    const queryBuilder = this.resultRepository.createQueryBuilder('result')
      .leftJoinAndSelect('result.competition', 'competition')
      .leftJoinAndSelect('competition.tournament', 'tournament')
      .leftJoinAndSelect('result.winner', 'winner')
      .leftJoinAndSelect('result.loser', 'loser')
      .skip(skip)
      .take(take);


    if (tournamentId) {
      queryBuilder.andWhere('tournament.id = :tournamentId', { tournamentId });
    }

    if (minPoints) {
      queryBuilder.andWhere('result.winnerPoints >= :minPoints OR result.loserPoints >= :minPoints', { minPoints });
    }
    if (maxPoints) {
      queryBuilder.andWhere('result.winnerPoints <= :maxPoints OR result.loserPoints <= :maxPoints', { maxPoints });
    }

    if (orderBy === 'winnerPoints') {
      queryBuilder.orderBy('result.winnerPoints', 'ASC');
    } else if (orderBy === 'loserPoints') {
      queryBuilder.orderBy('result.loserPoints', 'ASC');
    }

    const [results, total] = await queryBuilder.getManyAndCount();

    return {
      data: results,
      totalItems: total,
      currentPage: Math.ceil(skip / take) + 1,
      totalPages: Math.ceil(total / take),
    };
  }

  
}
