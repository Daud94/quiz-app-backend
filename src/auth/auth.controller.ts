import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { AuthService } from "./auth.service";
import { ApiBody } from "@nestjs/swagger";
import { UserLoginDto } from "../user/dto/userLogin.dto";
import { Roles } from "../decorators/roles.decorators";
import { CreateAdminDto } from "../admin/dto/createAdmin.dto";
import { AdminLoginDto } from "../admin/dto/adminLogin.dto";
import { AdminAuthGuard } from "./adminAuth.guard";
import { Permission } from "../iam/role/permission.enum";
import { RolesGuard } from "../iam/role/roles.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {
  }

  @ApiBody({ type: CreateUserDto })
  @Post('user/signup')
  async userSignup(@Body() userData: CreateUserDto) {
    return await this.authService.userSignup(userData);
  }


  @ApiBody({ type: UserLoginDto})
  @Post('user/login')
  async userLogin(@Body() userData: UserLoginDto) {
    return await this.authService.userLogin(userData);
  }

  @UseGuards(RolesGuard)
  @Roles(Permission.ADD_ADMIN)
  @UseGuards(AdminAuthGuard)
  @ApiBody({type: CreateAdminDto})
  @Post('admin/signup')
  async adminSignup(@Body() adminData: CreateAdminDto) {
    return await this.authService.adminSignup(adminData);
  }

  @Post('admin/login')
  @ApiBody({type: AdminLoginDto})
  async adminLogin(@Body() adminData: AdminLoginDto) {
    return await this.authService.adminLogin(adminData);
  }

}