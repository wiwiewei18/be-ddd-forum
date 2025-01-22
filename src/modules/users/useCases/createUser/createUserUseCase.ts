import { Either, Result, right } from "../../../../shared/core/result";
import { AppError } from "../../../../shared/core/appError";
import { UseCase } from "../../../../shared/core/useCase";
import { CreateUserDTO } from "./createUserDTO";
import { CreateUserErrors } from "./createUserErrors";
import { UserEmail } from "../../domain/userEmail";

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

    return right(Result.ok<void>());
  }
}
