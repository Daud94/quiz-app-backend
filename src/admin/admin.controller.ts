import { Controller, Post, UseGuards } from "@nestjs/common";
import { AdminAuthGuard } from "../auth/adminAuth.guard";
import { Roles } from "../decorators/roles.decorators";
import { Permission } from "../iam/role/permission.enum";
import { RolesGuard } from "../iam/role/roles.guard";
import { CreateQuestionDto } from "../question/dto/createQuestionDto";
import { QuestionsService } from "../question/questions.service";

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
  async createQuestion(body: CreateQuestionDto) {
    await this.questionsService.createQuestion(body)
    return {success: true, message: 'Question added successfully'}
  }

}