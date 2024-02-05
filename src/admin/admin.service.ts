import { ADMIN_REPOSITORY } from "../constants";
import { Admin } from "./admin.entity";
import { Inject, Injectable } from "@nestjs/common";


@Injectable()
export class adminService {
  constructor(
    @Inject(ADMIN_REPOSITORY) adminRepo: typeof Admin
  ) {
  }


}