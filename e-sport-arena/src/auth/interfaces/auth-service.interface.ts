import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/entities/user.entity";
import { LoginUserDto } from '../dto/login-user.dto';
import { CreatePlayerDto } from '../dto/create-player.dto'
import { Player } from "src/players/entities/player.entity";

export interface LoginResponse extends Partial<User> {
    token: string;
    user: Partial<User>; 
  }


export interface IAuthService{
    register(createUserDto: CreateUserDto): Promise<Partial<User>>;
    login(loginUserDto : LoginUserDto) : Promise<LoginResponse>;
    registerPlayer(CreatePlayerDto: CreatePlayerDto): Promise<Partial<Player>>

}