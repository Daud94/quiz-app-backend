import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export class CreateAdminDto {
  @IsNotEmpty({ message: "Provide your first name" })
  firstName: string;

  @IsNotEmpty({ message: "Provide your last name" })
  lastName: string;

  @IsNotEmpty({ message: "Role can not be empty" })
  @IsEmail()
  role: string;

  @IsNotEmpty({ message: "Email can not be empty" })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: "Password can not be empty" })
  @Length(8, 255)
  @Matches(passwordRegex,
    { message: "Password must be alphanumeric with at least a special character" })
  password: string;
}