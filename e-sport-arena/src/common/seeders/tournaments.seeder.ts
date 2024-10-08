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
    ) { }

    async run(): Promise<void> {
        const tournaments = [
            { name: 'Tournament22', startDate: '2024-10-10T09:00:00', endDate: '2024-10-15T18:00:00' },
            { name: 'Tournament30', startDate: '2024-10-16T10:00:00', endDate: '2024-10-20T17:00:00' },
            { name: 'Tournament50', startDate: '2024-10-21T08:30:00', endDate: '2024-10-25T19:30:00' },
            { name: 'Tournament60', startDate: '2024-10-26T11:00:00', endDate: '2024-10-30T16:30:00' },
            { name: 'Tournament70', startDate: '2024-11-01T07:45:00', endDate: '2024-11-05T15:00:00' },
            { name: 'Tournament60', startDate: '2024-11-06T09:00:00', endDate: '2024-11-10T18:00:00' },
            { name: 'Tournament70', startDate: '2024-11-11T10:00:00', endDate: '2024-11-15T17:30:00' },
            { name: 'Tournament80', startDate: '2024-11-16T09:30:00', endDate: '2024-11-20T16:00:00' },
            { name: 'Tournament90', startDate: '2024-11-21T08:00:00', endDate: '2024-11-25T17:00:00' },
            { name: 'Tournament100', startDate: '2024-11-26T09:15:00', endDate: '2024-11-30T16:45:00' },
            { name: 'Tournament110', startDate: '2024-12-01T07:00:00', endDate: '2024-12-05T14:00:00' },
            { name: 'Tournament120', startDate: '2024-12-06T10:00:00', endDate: '2024-12-10T19:00:00' },
            { name: 'Tournament130', startDate: '2024-12-11T09:00:00', endDate: '2024-12-15T18:00:00' },
            { name: 'Tournament140', startDate: '2024-12-16T08:00:00', endDate: '2024-12-20T17:00:00' },
            { name: 'Tournament150', startDate: '2024-12-21T07:30:00', endDate: '2024-12-25T15:30:00' },
          ];

        for (const tournamentData of tournaments) {
            const tournamentExists = await this.tournamentRepository.findOne({
                where: {
                    name: tournamentData.name,
                },
                withDeleted: true
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
