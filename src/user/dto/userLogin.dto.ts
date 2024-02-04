import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: "Email can not be empty" })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Password can not be empty" })
  @Length(8, 255)
  @Matches(passwordRegex,
    { message: "Password must be alphanumeric with at least a special character" })
  password: string;
}