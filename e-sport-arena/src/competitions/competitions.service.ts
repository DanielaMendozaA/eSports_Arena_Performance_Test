import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Competition } from './entities/competition.entity';
import { Repository } from 'typeorm';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Player } from 'src/players/entities/player.entity';

@Injectable()
export class CompetitionsService {
  constructor(
    @InjectRepository(Competition)
    private readonly competitionRepository: Repository<Competition>,
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,

  ) { }
  async create(createCompetitionDto: CreateCompetitionDto) {
    const { matchDate, tournamentId } = createCompetitionDto;
    const tournament = await this.tournamentRepository.findOne({ where: { id: tournamentId } });
    if (!tournament)
      throw new NotFoundException("Tournament not found");

    const { startDate, endDate } = tournament;
    const matchDateObj = new Date(matchDate);
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (matchDateObj < startDateObj || matchDateObj > endDateObj) {
      throw new BadRequestException("The match date must be between the start and end date of the tournament");
    }
    console.log(matchDate);

    console.log(startDate, endDate);

    const availablePlayers = await this.playerRepository.createQueryBuilder('player')
      .leftJoin('player.competitions', 'competition')
      .leftJoin('competition.tournament', 'tournament')
      .where('tournament.id = :tournamentId', { tournamentId })
      .andWhere('DATE(competition.matchDate) != DATE(:matchDate)', { matchDate }) 
      .orWhere('competition.id IS NULL') 
      .getMany();

    console.log("Jugadores disponibles", availablePlayers);


    if (availablePlayers.length < 2) {
      throw new BadRequestException('Not enough available players for the match');
    }

    const selectedPlayers = this.getRandomPlayers(availablePlayers, 2);

    console.log("jugadores seleccionados",selectedPlayers);


    const newCompetition = this.competitionRepository.create({
      ...createCompetitionDto,
      tournament: { id: tournament.id },
      players: selectedPlayers,

    });

    return await this.competitionRepository.save(newCompetition);

  }

  private getRandomPlayers(players: Player[], numberOfPlayers: number): Player[] {
    const shuffledPlayers = players.sort(() => 0.5 - Math.random());
    return shuffledPlayers.slice(0, numberOfPlayers);
  }

}
