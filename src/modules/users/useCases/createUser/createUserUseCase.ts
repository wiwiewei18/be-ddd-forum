import { Either, Result, right } from "../../../../shared/core/result";
import { AppError } from "../../../../shared/core/appError";
import { UseCase } from "../../../../shared/core/useCase";
import { CreateUserDTO } from "./createUserDTO";
import { CreateUserErrors } from "./createUserErrors";
import { UserEmail } from "../../domain/userEmail";
import { UserPassword } from "../../domain/userPassword";
import { UserName } from "../../domain/userName";

type Response = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, Promise<Response>>
{
  async execute(request: CreateUserDTO): Promise<Response> {
    const emailOrError = UserEmail.create(request?.email);
    const passwordOrError = UserPassword.create({ value: request.password });
    const usernameOrError = UserName.create({ name: request.username });

    return right(Result.ok<void>());
  }
}
