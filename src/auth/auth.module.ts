import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../user/users.service";
import { usersProviders } from "../user/users.providers";
import { AuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
require("dotenv").config();
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    JwtService,
    AuthService,
    UsersService,
    ...usersProviders
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
