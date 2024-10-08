import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { CompetitionsModule } from 'src/competitions/competitions.module';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result]),
    CompetitionsModule,
    PlayersModule
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [
    TypeOrmModule,
    ResultsService
  ]
})
export class ResultsModule {}
