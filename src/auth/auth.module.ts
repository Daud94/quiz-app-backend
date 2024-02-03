import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../user/users.service";
import { usersProviders } from "../user/users.providers";
import { AuthController } from "./auth.controller";

@Module({
  imports: [],
  providers: [
    AuthService,
    UsersService,
    ...usersProviders
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
