import { Module } from '@nestjs/common';
import { DatabaseModule } from "../database/database.module";
import { QuestionsService } from "../question/questions.service";
import { questionsProviders } from "../question/questions.providers";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { adminProviders } from "./admin.providers";
import { RoleService } from "../iam/role/role.service";
import { rolesProviders } from "../iam/role/roles.providers";

@Module({
  imports: [DatabaseModule],
  providers: [
    RoleService,
    AdminService,
    QuestionsService,
    ...questionsProviders,
    ...adminProviders,
    ...rolesProviders,
  ],
  controllers: [AdminController]

})
export class AdminModule {}
