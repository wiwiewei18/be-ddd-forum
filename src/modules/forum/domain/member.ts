import { AggregateRoot } from "../../../shared/domain/aggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { Result } from "../../../shared/core/result";
import { UserId } from "../../users/domain/userId";
import { UserName } from "../../users/domain/userName";
import { Guard } from "../../../shared/core/guard";
import { MemberCreated } from "./events/memberCreated";
import { MemberId } from "./memberId";

interface MemberProps {
  userId: UserId;
  username: UserName;
  reputation?: number;
}

export class Member extends AggregateRoot<MemberProps> {
  get memberId(): MemberId {
    return MemberId.create(this._id).getValue();
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get username(): UserName {
    return this.props.username;
  }

  get reputation(): number {
    return this.props.reputation;
  }

  private constructor(props: MemberProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: MemberProps,
    id?: UniqueEntityID
  ): Result<Member> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.userId, argumentName: "userId" },
      { argument: props.username, argumentName: "username" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<Member>(guardResult.getErrorValue());
    }

    const defaultValues: MemberProps = {
      ...props,
      reputation: props.reputation ? props.reputation : 0,
    };

    const member = new Member(defaultValues, id);
    const isNewMember = !!id === false;

    if (isNewMember) {
      member.addDomainEvent(new MemberCreated(member));
    }

    return Result.ok<Member>(member);
  }
}
