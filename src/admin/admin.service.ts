import { ADMIN_REPOSITORY } from "../constants";
import { Admin } from "./admin.entity";
import { Inject, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/createAdmin.dto";
import { User } from "../user/user.entity";


@Injectable()
export class adminService {
  constructor(
    @Inject(ADMIN_REPOSITORY) adminRepo: typeof Admin
  ) {
  }
  async createAdmin(data: CreateAdminDto) {
  return await Admin.create({...data})
  }

  async findOneByEmail(email: string){
    return await User.findOne({
      where: {
        email: email
      }
    })
  }
}