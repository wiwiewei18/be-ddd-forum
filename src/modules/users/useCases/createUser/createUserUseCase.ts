import { Either, Result, right } from "../../../../shared/core/result";
import { AppError } from "../../../../shared/core/appError";
import { UseCase } from "../../../../shared/core/useCase";
import { CreateUserDTO } from "./createUserDTO";

type Response = Either<AppError.UnexpectedError | Result<any>, Result<void>>;

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, Promise<Response>>
{
  async execute(request?: CreateUserDTO | undefined): Promise<Response> {
    return right(Result.ok<void>());
  }
}
