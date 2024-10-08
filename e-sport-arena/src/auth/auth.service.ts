
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


import { IAuthService } from './interfaces/auth-service.interface';
import { IUserService } from 'src/users/interfaces/user-service.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { CreatePlayerDto } from './dto/create-player.dto'
import { Rank } from 'src/players/enums/rank.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Repository } from 'typeorm';



@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
    @InjectRepository(Player)
    private readonly playerRepository : Repository<Player>,
    private readonly jwtService: JwtService,
  ) { };

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);

    if (!user)
      throw new UnauthorizedException("Invalid Credentials")

    const payload: JwtPayload = { email: user.email, id: user.id, role: user.role }

    const token = this.generateJwtToken(payload)

    return {
      user,
      token
    }
  }


  async register(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto
    const hashedPassword = this.hashingPassword(password)
    const newUser = {
      ...rest,
      password: hashedPassword
    }
    const createdUser = await this.userService.createUser(newUser)
    const userResponse = {
      id: createdUser.id,
      userName: createdUser.userName,
      email: createdUser.email
    }
    console.log(userResponse);

    return userResponse
  }

  async registerPlayer(CreatePlayerDto: CreatePlayerDto) {
    const { userName, email, password, gamerTag, rank = Rank.BRONZE } = CreatePlayerDto;
    const newUser = {
      userName,
      email,
      password
    };
    const registeredUser = await this.register(newUser);
    console.log(registeredUser.id);
    

    const newPlayer = {
      gamerTag,
      rank,
      user: {id : registeredUser.id}
    }

    const createPlayer =  this.playerRepository.create(newPlayer)

    return await this.playerRepository.save(createPlayer)

    


  }

  private hashingPassword(password: string) {
    const salt: string = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt)
  }

  private generateJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload)
  }

  private async validateUser(userEmail: string, userPassword: string): Promise<Partial<User>> {
    const user = await this.userService.findByEmailWithPassword(userEmail);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const { password, email, id, role }: Partial<User> = user

    const isValidPassword = this.comparePassword(userPassword, password)
    if (!isValidPassword)
      throw new UnauthorizedException("Invalid credentials")

    return { email, id, role }
  }

  private comparePassword(userPassword: string, password: string): boolean {
    return bcrypt.compareSync(userPassword, password);
  }


}
