import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UsersService } from "./users.service";
import { usersProviders } from "./users.providers";
import { UserController } from "./user.controller";

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersService,
    ...usersProviders
  ],
  exports: [UsersService],
  controllers: [UserController]
})
export class UserModule {
}
