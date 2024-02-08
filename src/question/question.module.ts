import { Module } from '@nestjs/common';
import { DatabaseModule } from "../database/database.module";
import { questionsProviders } from "./questions.providers";

@Module({
  imports: [DatabaseModule],
  providers: [
    ...questionsProviders
  ]
})
export class QuestionModule {}
