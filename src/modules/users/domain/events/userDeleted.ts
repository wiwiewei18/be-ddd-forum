import { User } from "../user";
import { IDomainEvent } from "../../../../shared/domain/events/iDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/uniqueEntityID";

export class UserDeleted implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
