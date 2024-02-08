import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { QuestionDifficultyEnum, QuestionsTypeEnum } from "../questionsTypeEnum";

export class CreateQuestionDto{

  @ApiProperty()
  @IsNotEmpty({ message: "subject can not be empty" })
  @Transform((params) => params.value.trim())
  subject: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Question can not be empty" })
  @Transform((params) => params.value.trim())
  question: string;

  @ApiProperty()
  @IsNotEmpty({ message: " Type can not be empty" })
  @IsEnum(QuestionsTypeEnum,{message: 'Invalid question type'})
  type: string;

  @ApiProperty()
  @IsNotEmpty({ message: "subject can not be empty" })
  @IsEnum(QuestionDifficultyEnum,{message: 'Invalid question difficulty'})
  difficulty: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Options can not be empty" })
  @Transform((params) => params.value.trim)
  options: string[];

  @ApiProperty()
  @IsNotEmpty({ message: " Mark can not be empty" })
  @Transform((params) => parseFloat(params.value))
  mark: number;
}