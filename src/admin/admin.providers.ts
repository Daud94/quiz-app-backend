import { ADMIN_REPOSITORY} from "../constants";
import { Admin } from "./admin.entity";

export const adminProviders = [
  {
    provide: ADMIN_REPOSITORY,
    useValue: Admin,
  },
];