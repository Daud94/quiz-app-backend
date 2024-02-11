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

  async getUserAttemptById(attempId: number){
    return await Attempt.findOne({
      where: {
        id: attempId
      },
      attributes: ['id','score','attemptedQuestions']
    })
  }

  async getUserAttempts(userId: string, page: number, limit: number){
    const offset = (page - 1) * limit
    return await Attempt.findAndCountAll({
      where: {
        userId:userId,
      },
      attributes: ['id','score','createdAt'],
      offset: offset,
      limit: limit
    })
  }

}