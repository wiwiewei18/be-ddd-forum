import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { ValueObject } from "../../../shared/domain/valueObject";
import { Result } from "../../../shared/core/result";
import { Guard } from "../../../shared/core/guard";

export class UserId extends ValueObject<{ value: UniqueEntityID }> {
  getStringValue(): string {
    return this.props.value.toString();
  }

  getValue(): UniqueEntityID {
    return this.props.value;
  }

  private constructor(value: UniqueEntityID) {
    super({ value });
  }

  public static create(value: UniqueEntityID): Result<UserId> {
    let guardResult = Guard.againstNullOrUndefined(value, "value");
    if (guardResult.isFailure) {
      return Result.fail<UserId>(guardResult.getErrorValue());
    }
    return Result.ok<UserId>(new UserId(value));
  }
}
