import { Module } from '@nestjs/common';
import { DatabaseModule } from "../../database/database.module";
import { RoleService } from "./role.service";

@Module({
  imports: [DatabaseModule],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
