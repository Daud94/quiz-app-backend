import { USERS_REPOSITORY } from "../constants";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY) private usersRepo: typeof User
  ) {}

  async createUser(data: CreateUserDto){
    return await this.usersRepo.create({...data})
  }

  async findOneByEmail(email: string){
    return await User.findOne({
      where: {
        email: email
      }
    })
  }

  async getUserById(id: string){
    return User.findOne({
      where: {
        userId: id
      },
      attributes: ['id','firstName','lastName','email'],
    })
  }
}