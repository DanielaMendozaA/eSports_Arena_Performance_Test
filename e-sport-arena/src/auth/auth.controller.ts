import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, BadRequestException } from '@nestjs/common';
import { IAuthService, LoginResponse } from './interfaces/auth-service.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'src/users/entities/user.entity';
import { ApiDocLoginUser, ApiDocRegisterUser } from './decorators/auth-swagger.decorator';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { CreatePlayerDto } from './dto/create-player.dto'
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags("Auth")
@ApiExtraModels(RegisterResponseDto, LoginResponseDto, CreatePlayerDto, CreateUserDto)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService
  ) {}

  @ApiDocRegisterUser(RegisterResponseDto)
  @Post('register')
  create(@Body() CreatePlayerDto: CreatePlayerDto) : Promise<Partial<User>>{
    return this.authService.registerPlayer(CreatePlayerDto)
  }

  @ApiDocLoginUser(LoginResponseDto)
  @Post('login')
  login(@Body() loginUserDto : LoginUserDto): Promise<LoginResponse>{
    return this.authService.login(loginUserDto)
  }

}
