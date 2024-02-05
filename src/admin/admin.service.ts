import { ADMIN_REPOSITORY } from "../constants";
import { Admin } from "./admin.entity";
import { Inject, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/createAdmin.dto";


@Injectable()
export class AdminService {
  constructor(
    @Inject(ADMIN_REPOSITORY) adminRepo: typeof Admin
  ) {
  }
  async createAdmin(data: CreateAdminDto) {
  return await Admin.create({...data})
  }

  async findOneByEmail(email: string){
    return await Admin.findOne({
      where: {
        email: email
      }
    })
  }
}