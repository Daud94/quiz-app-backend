import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { AuthService } from "./auth.service";
import { ApiBody } from "@nestjs/swagger";
import { UserLoginDto } from "../user/dto/userLogin.dto";
import { Public } from "../decorators/public.decorators";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }

  @Public()
  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  async signup(@Body() userData: CreateUserDto) {
    return await this.authService.signup(userData);
  }
  @Public()
  @Post('signin')
  @ApiBody({ type: UserLoginDto})
  async signin(@Body() userData: UserLoginDto) {
    return await this.authService.signin(userData);
  }

}