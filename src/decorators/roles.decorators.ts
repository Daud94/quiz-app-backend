import { SetMetadata } from '@nestjs/common';
import { Permission } from "../iam/role/permission.enum";

export const PERMISSIONS_KEY = 'permissions';
export const Roles = (...permissions: Permission[]) => SetMetadata(PERMISSIONS_KEY, permissions);