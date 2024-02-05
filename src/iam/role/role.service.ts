import { CreateRoleDto } from "./dto/createRole.dto";
import { Role } from "./role.entity";
import { Inject, Injectable } from "@nestjs/common";
import { ROLE_REPOSITORY } from "../../constants";

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY) roleRepo: typeof Role
  ) {
  }

  async createRole(data: CreateRoleDto) {
    return await Role.create({...data});
  }

  async findRoleByName(name: string) {
    return await Role.findOne({
      where: {
        name
      }
    });
  }
}