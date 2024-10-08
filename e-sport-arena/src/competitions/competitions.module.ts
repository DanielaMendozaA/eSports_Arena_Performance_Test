import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition } from './entities/competition.entity';
import { TournamentsModule } from 'src/tournaments/tournaments.module';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Competition]),
    TournamentsModule,
    PlayersModule
  ],
  controllers: [CompetitionsController],
  providers: [CompetitionsService],
  exports: [
    TypeOrmModule,
    CompetitionsService
  ]

})
export class CompetitionsModule {}
