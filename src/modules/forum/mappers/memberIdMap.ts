import { Mapper } from "../../../shared/infra/mapper";
import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { MemberId } from "../domain/memberId";

export class MemberIdMap implements Mapper<MemberId> {
  public static toDomain(rawMember: any): MemberId {
    const memberIdOrError = MemberId.create(
      new UniqueEntityID(rawMember.member_id)
    );
    return memberIdOrError.isSuccess ? memberIdOrError.getValue() : null;
  }
}
