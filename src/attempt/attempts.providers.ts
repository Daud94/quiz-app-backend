import { ATTEMPTS_REPOSITORY} from "../constants";
import { Attempt } from "./attempt.entity";

export const attemptsProviders = [
  {
    provide: ATTEMPTS_REPOSITORY,
    useValue: Attempt,
  },
];