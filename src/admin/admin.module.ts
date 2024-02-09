import { Module } from '@nestjs/common';
import { DatabaseModule } from "../database/database.module";
import { QuestionsService } from "../question/questions.service";
import { questionsProviders } from "../question/questions.providers";
import { AdminController } from "./admin.controller";

@Module({
  imports: [DatabaseModule],
  providers: [
    QuestionsService,
    ...questionsProviders,
  ],
  controllers: [AdminController]

})
export class AdminModule {}
