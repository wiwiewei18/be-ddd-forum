import { User } from "../../users/domain/user";
import { UserCreated } from "../../users/domain/events/userCreated";
import { IHandle } from "../../../shared/domain/events/iHandle";
import { CreateMember } from "../useCases/members/createMember/createMember";
import { DomainEvents } from "../../../shared/domain/events/domainEvents";

export class AfterUserCreated implements IHandle<UserCreated> {
  private createMember: CreateMember;

  constructor(createMember: CreateMember) {
    this.setupSubscriptions();
    this.createMember = createMember;
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(this.onUserCreated.bind(this), UserCreated.name);
  }

  private async onUserCreated(event: UserCreated): Promise<void> {
    const { user } = event;

    try {
      await this.createMember.execute({ userId: user.userId.getStringValue() });
      console.log(
        `[AfterUserCreated]: Successfully executed CreateMember use case AfterUserCreated`
      );
    } catch (err) {
      console.log(
        `[AfterUserCreated]: Failed to execute CreateMember use case AfterUserCreated.`
      );
    }
  }
}
