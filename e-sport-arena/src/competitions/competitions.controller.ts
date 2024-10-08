import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyAuthService } from 'src/auth/decorators/verify-auth.decorator';
import { UserRoleEnum } from 'src/common/enums/roles.enum';

@ApiTags("Competitions")
@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @VerifyAuthService([UserRoleEnum.ADMIN])
  @Post()
  create(@Body() createCompetitionDto: CreateCompetitionDto){
    return this.competitionsService.create(createCompetitionDto)
  }


}
