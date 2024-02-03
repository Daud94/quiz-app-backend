import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UsersService } from "./users.service";
import { usersProviders } from "./users.providers";

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersService,
    ...usersProviders
  ],
  exports: [UsersService]
})
export class UserModule {
}
