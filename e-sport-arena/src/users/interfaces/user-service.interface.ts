import { UserRoleEnum } from "src/common/enums/roles.enum";
import { User } from "../entities/user.entity";
import { CreateUserDto } from '../dto/create-user.dto';


export interface IUserService {
    findOneByTerm(term: string): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findByEmailWithPassword(email: string):  Promise<Partial<User>>

}