import { ROLE_REPOSITORY} from "../../constants";
import { Role } from "./role.entity";

export const rolesProviders = [
  {
    provide: ROLE_REPOSITORY,
    useValue: Role,
  },
];