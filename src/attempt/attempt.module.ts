import { Module } from '@nestjs/common';
import { DatabaseModule } from "../database/database.module";
import { attemptsProviders } from "./attempts.providers";

@Module({
  imports:[DatabaseModule],
  providers:[
    ...attemptsProviders
  ]
})
export class AttemptModule {}
