import { ATTEMPTS_REPOSITORY } from "../constants";
import { Attempt } from "./attempt.entity";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AttemptsService{
  constructor(
    @Inject(ATTEMPTS_REPOSITORY) private attemptRepo: typeof Attempt
  ) {
  }

  async createAttempt(data){
    return await Attempt.create(data)
  }
}