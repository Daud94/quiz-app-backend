import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UsersService } from "./users.service";
import { usersProviders } from "./users.providers";
import { UserController } from "./user.controller";
import { QuestionsService } from "../question/questions.service";
import { questionsProviders } from "../question/questions.providers";

@Module({
  imports: [DatabaseModule],
  providers: [
    QuestionsService,
    UsersService,
    ...usersProviders,
    ...questionsProviders,
  ],
  exports: [UsersService],
  controllers: [UserController]
})
export class UserModule {
}
