import { left, Result, right } from "../../../../shared/core/result";
import { AppError } from "../../../../shared/core/appError";
import { UseCase } from "../../../../shared/core/useCase";
import { CreateUserDTO } from "./createUserDTO";
import { CreateUserResponse } from "./createUserResponse";
import { CreateUserErrors } from "./createUserErrors";
import { UserEmail } from "../../domain/userEmail";
import { UserPassword } from "../../domain/userPassword";
import { UserName } from "../../domain/userName";
import { User } from "../../domain/user";
import { IUserRepo } from "../../repos/userRepo";

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, Promise<CreateUserResponse>>
{
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: CreateUserDTO): Promise<CreateUserResponse> {
    const emailOrError = UserEmail.create(request?.email);
    const passwordOrError = UserPassword.create({ value: request.password });
    const usernameOrError = UserName.create({ name: request.username });

    const dtoResult = Result.combine([
      emailOrError,
      passwordOrError,
      usernameOrError,
    ]);

    if (dtoResult.isFailure) {
      return left(
        Result.fail<void>(dtoResult.getErrorValue())
      ) as CreateUserResponse;
    }

    const email: UserEmail = emailOrError.getValue();
    const password: UserPassword = passwordOrError.getValue();
    const username: UserName = usernameOrError.getValue();

    try {
      const userAlreadyExists = await this.userRepo.exists(email);

      if (userAlreadyExists) {
        return left(
          new CreateUserErrors.EmailAlreadyExistsError(email.value)
        ) as CreateUserResponse;
      }

      try {
        const alreadyCreatedUserByUserName =
          await this.userRepo.getUserByUserName(username);

        const userNameTaken = !!alreadyCreatedUserByUserName === true;

        if (userNameTaken) {
          return left(
            new CreateUserErrors.UsernameTakenError(username.value)
          ) as CreateUserResponse;
        }
      } catch (err) {}

      const userOrError: Result<User> = User.create({
        email,
        password,
        username,
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<User>(userOrError.getErrorValue().toString())
        ) as CreateUserResponse;
      }

      const user: User = userOrError.getValue();

      await this.userRepo.save(user);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as CreateUserResponse;
    }
  }
}
