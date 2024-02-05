import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { AuthService } from "./auth.service";
import { ApiBody } from "@nestjs/swagger";
import { UserLoginDto } from "../user/dto/userLogin.dto";
import { Public } from "../decorators/public.decorators";
import { Permission } from "../iam/role/permission.enum";
import { Roles } from "../decorators/roles.decorators";
import { CreateAdminDto } from "../admin/dto/createAdmin.dto";
import { AdminService } from "../admin/admin.service";
import { AdminLoginDto } from "../admin/dto/adminLogin.dto";
import { AdminAuthGuard } from "./adminAuth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {
  }

  @Post('user/signup')
  @ApiBody({ type: CreateUserDto })
  async userSignup(@Body() userData: CreateUserDto) {
    return await this.authService.userSignup(userData);
  }

  @Post('user/login')
  @ApiBody({ type: UserLoginDto})
  async userLogin(@Body() userData: UserLoginDto) {
    return await this.authService.userLogin(userData);
  }

  @UseGuards(AdminAuthGuard)
  @Post('admin/signup')
  @ApiBody({type: CreateAdminDto})
  @Roles(Permission.ADD_ADMIN)
  async adminSignup(@Body() adminData: CreateAdminDto) {
    return await this.authService.adminSignup(adminData);

  }
  @Post('admin/login')
  @ApiBody({type: AdminLoginDto})
  async adminLogin(@Body() adminData: AdminLoginDto) {
    console.log(adminData);
    return await this.authService.adminLogin(adminData);
  }

}