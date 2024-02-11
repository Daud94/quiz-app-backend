import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { QuestionsTypeEnum } from "../../question/questionsTypeEnum";

export class AttemptedQuestionsDto{
  @IsString()
  @IsNotEmpty({message: 'Question is required'})
  @Transform((params) => params.value.trim())
  question: string

  @IsString()
  @IsNotEmpty({ message: "Question type is required" })
  @Transform((params) => params.value.trim())
  @IsEnum(QuestionsTypeEnum, { message: "Question type is invalid" })
  type: string

  @IsString()
  @IsNotEmpty({message: 'Subject is required'})
  @Transform((params) => params.value.trim())
  subject: string

  @IsString()
  @IsNotEmpty({message: 'Subject is required'})
  @Transform((params) => params.value.trim())
  difficulty: string

  @IsString()
  @IsNotEmpty({message: 'Selected option is required'})
  @Transform((params) => params.value.trim())
  selectedOption: string

  @IsString()
  @IsNotEmpty({message: 'Correct option is required'})
  @Transform((params) => params.value.trim())
  correctOption: string

  @IsNotEmpty({message: "Question's mark is required"})
  @Transform((params) => parseInt(params.value))
  mark: number
}