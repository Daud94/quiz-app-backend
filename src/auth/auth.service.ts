import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { JwtService } from "@nestjs/jwt";
import { UserLoginDto } from "../user/dto/userLogin.dto";
import { verifyHash } from "../utils/util";
import { CreateAdminDto } from "../admin/dto/createAdmin.dto";
import { AdminService } from "../admin/admin.service";
import { RoleService } from "../iam/role/role.service";
require('dotenv').config()

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private adminService: AdminService,
    private roleService: RoleService,
    private jwtService: JwtService
  ) {
  }

  async userSignup(reqBody: CreateUserDto) {
    const user = await this.usersService.findOneByEmail(reqBody.email);
    if (user) {
      throw new ConflictException("User exists with the email");
    }
    await this.usersService.createUser(reqBody);
    return { success: true, message: "Signup successful" };
  }

  async userLogin (reqBody: UserLoginDto) {
    const user = await this.usersService.findOneByEmail(reqBody.email);
    if (!user){
      throw new BadRequestException('Invalid user credential')
    }

    const isValidPassword = await verifyHash(reqBody.password, user.password)
    if(!isValidPassword){
      throw new UnauthorizedException()
    }

    const payload = {userId: user.userId}
    const token = await this.jwtService.signAsync(payload,{secret: process.env['JWT_SECRET']})

    return {success: true, message: 'You are signed in!', accessToken : token}
  }

  async adminSignup(reqBody: CreateAdminDto) {
    const admin = await this.adminService.findOneByEmail(reqBody.email);
    if (admin) {
      throw new ConflictException("Admin exists with the email");
    }
    await this.usersService.createUser(reqBody);
    return { success: true, message: "Signup successful" };
  }

  async adminLogin (reqBody: UserLoginDto) {
    const admin = await this.adminService.findOneByEmail(reqBody.email);
    if (!admin){
      throw new BadRequestException('Invalid user credential')
    }

    const isValidPassword = await verifyHash(reqBody.password, admin.password)
    if(!isValidPassword){
      throw new UnauthorizedException()
    }

    const role = await this.roleService.findRoleByName(admin.role)

    const payload = {adminId: admin.adminId, permissions: role.permissions}
    const token = await this.jwtService.signAsync(payload,{secret: process.env['JWT_SECRET']})
    return {success: true, message: 'You are signed in!', accessToken : token}
  }
}