import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { JwtSecretRequestType, JwtService } from "@nestjs/jwt";
import { UserLoginDto } from "../user/dto/userLogin.dto";
import { verifyHash } from "../utils/util";
require('dotenv').config()

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async signup(reqBody: CreateUserDto) {
    const user = await this.usersService.findOneByEmail(reqBody.email);
    console.log(user);
    if (user) {
      throw new ConflictException("User exists with the email");
    }
    await this.usersService.createUser(reqBody);
    return { success: true, message: "Signup successful" };
  }

  async signin (reqBody: UserLoginDto) {
    const user = await this.usersService.findOneByEmail(reqBody.email);
    if (!user){
      throw new BadRequestException('Invalid user credential')
    }

    const isValidPassword = await verifyHash(reqBody.password, user.password)
    if(!isValidPassword){
      throw new UnauthorizedException()
    }

    const payload = {userId: user.userId}
    const token = await this.jwtService.signAsync(payload,{secret: process.env['JWT_SECRET']})

    return {success: true, message: 'You are signed in!', accessToken : token}
  }
}