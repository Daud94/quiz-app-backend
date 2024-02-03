import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../user/createUser.dto";
import { AuthService } from "./auth.service";
import { ApiBody } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  async signup(@Body() userData: CreateUserDto) {
    return await this.authService.signup(userData);
  }

}