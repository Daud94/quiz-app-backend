import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { UserAuthGuard } from "../auth/userAuth.guard";
import { UsersService } from "./users.service";

@Controller('user')
export class UserController {
  constructor(
    private userService: UsersService
  ) {
  }
  @UseGuards(UserAuthGuard)
  @Get('profile')
  async getProfile(@Request() req){
    const user = await this.userService.getUserById(req.user.userId)
    return {success: true, message: 'User details fetched', data: user}
  }
}