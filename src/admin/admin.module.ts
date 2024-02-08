import { Module } from '@nestjs/common';
import { DatabaseModule } from "../database/database.module";
import { QuestionsService } from "../question/questions.service";
import { questionsProviders } from "../question/questions.providers";

@Module({
  imports: [DatabaseModule],
  providers: [
    QuestionsService,
    ...questionsProviders,
  ],

})
export class AdminModule {}
