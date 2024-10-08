import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { FindResultsDto } from './dto/query.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyAuthService } from 'src/auth/decorators/verify-auth.decorator';
import { UserRoleEnum } from 'src/common/enums/roles.enum';

@ApiTags("Results")
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @VerifyAuthService([UserRoleEnum.ADMIN])
  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @VerifyAuthService([UserRoleEnum.ADMIN, UserRoleEnum.PLAYER])
  @Get()
  async findAll(@Query() query: FindResultsDto) {
    return this.resultsService.findAll(query);
  }

}
