import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition } from './entities/competition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Competition])
  ],
  controllers: [CompetitionsController],
  providers: [CompetitionsService],
  exports: [
    TypeOrmModule,
    CompetitionsService
  ]

})
export class CompetitionsModule {}
