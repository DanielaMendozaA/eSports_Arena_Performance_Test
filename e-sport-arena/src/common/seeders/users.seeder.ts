import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { Seeder } from "typeorm-extension";

import * as bcrypt from 'bcryptjs';
import { User } from "src/users/entities/user.entity";
import { UserRoleEnum } from "../enums/roles.enum";



@Injectable()
export class UsersSeeder implements Seeder{

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async run(): Promise<void> {
        const users = [
            {email: "admin-e-soport@gmail.com", userName: "eSportAdmin", password: "eSport.admin.123", role: UserRoleEnum.ADMIN}, 
        ];

        for (const user of users) {
            const userExists = await this.userRepository.findOneBy({email: user.email});
            if (!userExists) {
                const salt = bcrypt.genSaltSync();
                const hashedPassword = await bcrypt.hash(user.password, salt);
                const newUser = this.userRepository.create({
                    ...user,
                    password: hashedPassword
                });
                await this.userRepository.save(newUser);
                Logger.log(`User ${user.email} created`);
            }else{
                Logger.log(`User ${user.email} already exists`);
            }
    

        }
        
    }
}