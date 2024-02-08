import { QUESTIONS_REPOSITORY } from "../constants";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Question } from "./question.entity";


@Injectable()
export class QuestionsService{
  constructor(
    @Inject(QUESTIONS_REPOSITORY) private questionsRepo: typeof Question
  ) {
  }

  async createQuestion(data) {
    try {
      return await Question.create({ ...data });
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async getQuestion(id){
    try {
      return await Question.findOne({
        where: {
          id: id
        }
      });
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async updateQuestion(id,data){
    try {
      const question = await this.getQuestion(id);
      Object.assign(question, data);
      return await question.save();
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async deleteQuestion(id){
    try {
      const question = await this.getQuestion(id);
      await question.destroy();
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async getAllQuestions(subject, difficulty,type, page, limit){
    const offset = (page - 1) * 100
    return await Question.findAndCountAll({
      where: {
        ...(subject && {subject: subject}),
        ...(difficulty && {difficulty: difficulty}),
        ...(type && {type: type}),
      },
      offset: offset,
      limit: limit
    })
  }
}