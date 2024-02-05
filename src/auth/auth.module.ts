import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../user/users.service";
import { usersProviders } from "../user/users.providers";
import { AuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AdminService } from "../admin/admin.service";
import { adminProviders } from "../admin/admin.providers";
import { rolesProviders } from "../iam/role/roles.providers";
import { RoleService } from "../iam/role/role.service";
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
    RoleService,
    AdminService,
    JwtService,
    AuthService,
    UsersService,
    ...usersProviders,
    ...adminProviders,
    ...rolesProviders
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
