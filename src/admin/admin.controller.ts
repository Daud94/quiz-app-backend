import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";

import { AdminAuthGuard } from "../auth/adminAuth.guard";
import { Roles } from "../decorators/roles.decorators";
import { Permission } from "../iam/role/permission.enum";
import { RolesGuard } from "../iam/role/roles.guard";
import { CreateQuestionDto } from "../question/dto/createQuestionDto";
import { QuestionsService } from "../question/questions.service";
import { Question } from "../question/question.entity";
import { QuestionDifficultyEnum, QuestionsTypeEnum } from "../question/questionsTypeEnum";

@Controller("admin")
export class AdminController {
  constructor(
    private readonly questionsService: QuestionsService
  ) {
  }

  @UseGuards(RolesGuard)
  @Roles(Permission.CREATE_QUESTION)
  @UseGuards(AdminAuthGuard)
  @Post("create-question")
  async createQuestion(@Body() body: CreateQuestionDto) {
    await this.questionsService.createQuestion(body);
    return { success: true, message: "Question added successfully" };
  }

  @UseGuards(RolesGuard)
  @Roles(Permission.UPDATE_QUESTION)
  @UseGuards(AdminAuthGuard)
  @Post("update-question")
  async updateQuestion(
    @Param("id", ParseIntPipe) id: number,
    body: Partial<Question>) {
    await this.questionsService.updateQuestion(id, body);
    return { success: true, message: "Question added successfully" };
  }

  @UseGuards(RolesGuard)
  @Roles(Permission.GET_QUESTIONS)
  @UseGuards(AdminAuthGuard)
  @Get('get-question')
  async getQuestion(
    @Param("id", ParseIntPipe) id: number) {
    await this.questionsService.getQuestion(id);
    return { success: true, message: "Question fetched successfully" };
  }

  @UseGuards(RolesGuard)
  @Roles(Permission.DELETE_QUESTION)
  @UseGuards(AdminAuthGuard)
  @Get('delete-question')
  async deleteQuestion(
    @Param("id", ParseIntPipe) id: number) {
    await this.questionsService.deleteQuestion(id);
    return { success: true, message: "Question deleted successfully" };
  }

  @UseGuards(RolesGuard)
  @Roles(Permission.DELETE_QUESTION)
  @UseGuards(AdminAuthGuard)
  @Get('get-all-questions')
  async getAllQuestions(
    @Query('subject') subject: string,
    @Query('difficulty', new ParseEnumPipe(QuestionDifficultyEnum)) difficulty: QuestionDifficultyEnum,
    @Query('type', new ParseEnumPipe(QuestionsTypeEnum)) type: QuestionsTypeEnum,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    await this.questionsService.getAllQuestions(subject, difficulty, type, page,limit);
    return { success: true, message: "Questions fetched successfully" };
  }

}