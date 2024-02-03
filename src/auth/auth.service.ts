import { ConflictException, Injectable } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { CreateUserDto } from "../user/createUser.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) {
  }

  async signup(reqBody: CreateUserDto) {
    const user = await this.usersService.findOneByEmail(reqBody.email);
    if (user) {
      throw new ConflictException("User exists with the email");
    }
    await this.usersService.createUser(reqBody);
    return { success: true, message: "Signup successful" };
  }
}