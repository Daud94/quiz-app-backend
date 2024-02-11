import {
  Body,
  Controller,
  DefaultValuePipe,
  Get, ParseArrayPipe,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards, UsePipes, ValidationPipe
} from "@nestjs/common";
import { UserAuthGuard } from "../auth/userAuth.guard";
import { UsersService } from "./users.service";
import { QuestionDifficultyEnum, QuestionsTypeEnum } from "../question/questionsTypeEnum";
import { QuestionsService } from "../question/questions.service";
import { shuffle } from "lodash";
import { AttemptsService } from "../attempt/attempts.service";
import { AttemptedQuestionsDto } from "../attempt/dto/attemptedQuestions.dto";
import { decryptData, encryptData } from "../helper/encryption";


@Controller("user")
export class UserController {
  constructor(
    private userService: UsersService,
    private questionService: QuestionsService,
    private attemptService: AttemptsService
  ) {
  }

  @UseGuards(UserAuthGuard)
  @Get("profile")
  async getProfile(@Request() req) {
    const user = await this.userService.getUserById(req.user.userId);
    return { success: true, message: "User details fetched", data: user };
  }

  @UseGuards(UserAuthGuard)
  @Get("take-quiz")
  async takeQuiz(
    @Query("subject") subject: string,
    @Query("numberOfQuestions", new DefaultValuePipe(20), ParseIntPipe) numberOfQuestions: number,
    @Query("difficulty", new ParseEnumPipe(QuestionDifficultyEnum, { optional: true })) difficulty: string,
    @Query("type", new ParseEnumPipe(QuestionsTypeEnum, { optional: true })) type: string,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("limit", new DefaultValuePipe(100), ParseIntPipe) limit: number
  ) {
    const questions = await this.questionService.getAllQuestions(
      subject, difficulty, type, page, limit
    );
    if (numberOfQuestions <= questions.count) {
      const slicedQuestions = questions.rows.slice(0, numberOfQuestions - 1);
      const encryptedOptions = await Promise.all(slicedQuestions.map((question) => {
        return {
          ...question.dataValues,
          correctOption: encryptData(question.correctOption)
        };
      }));
      return { success: true, message: "Quiz questions fetched", data: shuffle(encryptedOptions) };
    }

    if (numberOfQuestions >= questions.count) {
      const encryptedOptions = await Promise.all(questions.rows.map((question) => {
        return {
          ...question.dataValues,
          correctOption: encryptData(question.correctOption)
        };
      }));
      return { success: true, message: "Quiz questions fetched", data: shuffle(encryptedOptions) };

    }
  }

  @UseGuards(UserAuthGuard)
  @Post("submit-quiz")
  async submitQuiz(
    @Request() req,
    @Body(new ParseArrayPipe({ items: AttemptedQuestionsDto }))
      body: AttemptedQuestionsDto[]
  ) {
    const decryptedQuestions = await Promise.all(body.map(item => {
      return {
        ...item,
        correctOption: decryptData(item.correctOption)
      };
    }));

    const score = decryptedQuestions.filter(item => item.correctOption === item.selectedOption)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.mark;
      }, 0);

    await this.attemptService.createAttempt({
      attemptedQuestions: (decryptedQuestions),
      score: score,
      userId: req.user.userId
    });

    return {
      success: true,
      message: "Quiz attempt submitted!",
      data: {
        score: score,
        attemptedQuestions: decryptedQuestions
      }
    };
  }
}