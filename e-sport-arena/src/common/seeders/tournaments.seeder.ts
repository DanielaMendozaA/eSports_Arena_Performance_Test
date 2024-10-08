import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Tournament } from 'src/tournaments/entities/tournament.entity';

@Injectable()
export class TournamentsSeeder implements Seeder {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async run(): Promise<void> {
    const tournaments = [
      { name: 'Tournament1', startDate: '2024-10-10', endDate: '2024-10-15' },
      { name: 'Tournament2', startDate: '2024-10-16', endDate: '2024-10-20' },
      { name: 'Tournament3', startDate: '2024-10-21', endDate: '2024-10-25' },
      { name: 'Tournament4', startDate: '2024-10-26', endDate: '2024-10-30' },
      { name: 'Tournament5', startDate: '2024-11-01', endDate: '2024-11-05' },
      { name: 'Tournament6', startDate: '2024-11-06', endDate: '2024-11-10' },
      { name: 'Tournament7', startDate: '2024-11-11', endDate: '2024-11-15' },
      { name: 'Tournament8', startDate: '2024-11-16', endDate: '2024-11-20' },
      { name: 'Tournament9', startDate: '2024-11-21', endDate: '2024-11-25' },
      { name: 'Tournament10', startDate: '2024-11-26', endDate: '2024-11-30' },
      { name: 'Tournament11', startDate: '2024-12-01', endDate: '2024-12-05' },
      { name: 'Tournament12', startDate: '2024-12-06', endDate: '2024-12-10' },
      { name: 'Tournament13', startDate: '2024-12-11', endDate: '2024-12-15' },
      { name: 'Tournament14', startDate: '2024-12-16', endDate: '2024-12-20' },
      { name: 'Tournament15', startDate: '2024-12-21', endDate: '2024-12-25' },
    ];

    for (const tournamentData of tournaments) {
      const tournamentExists = await this.tournamentRepository.findOneBy({
        name: tournamentData.name,
      });

      if (!tournamentExists) {
        const newTournament = this.tournamentRepository.create({
          ...tournamentData,
        });

        await this.tournamentRepository.save(newTournament);
        Logger.log(`Tournament ${tournamentData.name} created`);
      } else {
        Logger.log(`Tournament ${tournamentData.name} already exists`);
      }
    }
  }
}
