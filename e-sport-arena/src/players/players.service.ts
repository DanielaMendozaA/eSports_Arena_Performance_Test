import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PlayersService {
  constructor( 
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>
){}


}
