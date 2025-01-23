import { Either, Result } from "../../../../shared/core/result";
import { CreateUserErrors } from "./createUserErrors";
import { AppError } from "../../../../shared/core/appError";

export type CreateUserResponse = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
