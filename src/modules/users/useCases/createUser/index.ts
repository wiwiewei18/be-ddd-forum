import { CreateUserUseCase } from "./createUserUseCase";
import { CreateUserController } from "./createUserController";
import { userRepo } from "../../repos";

const createUserUseCase = new CreateUserUseCase(userRepo);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
