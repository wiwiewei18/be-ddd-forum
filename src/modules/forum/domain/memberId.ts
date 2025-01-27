import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { Result } from "../../../shared/core/result";
import { ValueObject } from "../../../shared/domain/valueObject";
import { Guard } from "../../../shared/core/guard";

export class MemberId extends ValueObject<{ value: UniqueEntityID }> {
  getStringValue(): string {
    return this.props.value.toString();
  }

  getValue(): UniqueEntityID {
    return this.props.value;
  }

  private constructor(value: UniqueEntityID) {
    super({ value });
  }

  public static create(value: UniqueEntityID): Result<MemberId> {
    let guardResult = Guard.againstNullOrUndefined(value, "value");
    if (guardResult.isFailure) {
      return Result.fail<MemberId>(guardResult.getErrorValue());
    }
    return Result.ok<MemberId>(new MemberId(value));
  }
}
