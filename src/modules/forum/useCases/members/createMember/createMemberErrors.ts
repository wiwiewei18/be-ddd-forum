import { UseCaseError } from "../../../../../shared/core/useCaseError";
import { Result } from "../../../../../shared/core/result";

export namespace CreateMemberErrors {
  export class UserDoesntExistError extends Result<UseCaseError> {
    constructor(baseUserId: string) {
      super(false, {
        message: `A user for user id ${baseUserId} doesn't exist or was deleted.`,
      } as UseCaseError);
    }
  }

  export class MemberAlreadyExistsError extends Result<UseCaseError> {
    constructor(baseUserId: string) {
      super(false, {
        message: `Member for ${baseUserId} already exists.`,
      } as UseCaseError);
    }
  }
}
