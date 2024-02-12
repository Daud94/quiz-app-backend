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
  UseGuards,
  Request
} from "@nestjs/common";

import { AdminAuthGuard } from "../auth/adminAuth.guard";
import { Roles } from "../decorators/roles.decorators";
import { Permission } from "../iam/role/permission.enum";
import { RolesGuard } from "../iam/role/roles.guard";
import { CreateQuestionDto } from "../question/dto/createQuestionDto";
import { QuestionsService } from "../question/questions.service";
import { Question } from "../question/question.entity";
import { QuestionDifficultyEnum, QuestionsTypeEnum } from "../question/questionsTypeEnum";
import { AdminService } from "./admin.service";
import { CreateRoleDto } from "../iam/role/dto/createRole.dto";
import { RoleService } from "../iam/role/role.service";

@Controller("admin")
export class AdminController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly adminService: AdminService,
    private readonly roleService: RoleService
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
  @Post("update-question/:id")
  async updateQuestion(
    @Param("id", ParseIntPipe) id: number,
    body: Partial<Question>) {
    await this.questionsService.updateQuestion(id, body);
    return { success: true, message: "Question added successfully" };
  }

  @UseGuards(RolesGuard)
  @Roles(Permission.GET_QUESTIONS)
  @UseGuards(AdminAuthGuard)
  @Get("get-question/:id")
  async getQuestion(
    @Param("id", ParseIntPipe) id: number) {
    const question = await this.questionsService.getQuestion(id);
    return { success: true, message: "Question fetched successfully", data: question };
  }

  @UseGuards(RolesGuard)
  @Roles(Permission.DELETE_QUESTION)
  @UseGuards(AdminAuthGuard)
  @Get("delete-question/:id")
  async deleteQuestion(
    @Param("id", ParseIntPipe) id: number) {
    await this.questionsService.deleteQuestion(id);
    return { success: true, message: "Question deleted successfully" };
  }

  @UseGuards(RolesGuard)
  @Roles(Permission.DELETE_QUESTION)
  @UseGuards(AdminAuthGuard)
  @Get("get-all-questions")
  async getAllQuestions(
    @Query("subject") subject: string,
    @Query("difficulty", new ParseEnumPipe(QuestionDifficultyEnum, { optional: true })) difficulty: string,
    @Query("type", new ParseEnumPipe(QuestionsTypeEnum, { optional: true })) type: string,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("limit", new DefaultValuePipe(50), ParseIntPipe) limit: number
  ) {
    const questions = await this.questionsService.getAllQuestions(subject, difficulty, type, page, limit);
    return { success: true, message: "Questions fetched successfully", data: questions.rows, count: questions.count };
  }

  @UseGuards(RolesGuard)
  @Roles(Permission.ADD_ADMIN)
  @UseGuards(AdminAuthGuard)
  @Get("get-permissions")
  async getPermissions() {
    const permission = await this.adminService.getPermssions();
    return { success: true, message: "Permissions fetched", data: permission };
  }

  @UseGuards(RolesGuard)
  @Roles(Permission.ADD_ADMIN)
  @UseGuards(AdminAuthGuard)
  @Get("get-permissions")
  async addRole(
    @Body() body: CreateRoleDto,
    @Request() req
  ) {
    const admin = await this.adminService.findOneById(req.admin.adminId);
    await this.roleService.createRole({
      ...body, createdBy: `${admin.firstName} ${admin.lastName}`
    });

    return {success: true, message: 'Role added successfully'}
  }

}