import { IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";

export class CreateRoleDto{
  @IsNotEmpty({message: 'Role name can not be empty'})
  @Transform((params) => params.value.trim())
  name: string

  @IsNotEmpty({message: 'Permissions can not be empty'})
  permissions: string[]

  @IsNotEmpty({message: 'CreatedBy can not be empty'})
  @Transform((params) => params.value.trim())
  createdBy: string
}