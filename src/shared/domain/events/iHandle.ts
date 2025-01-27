import { IDomainEvent } from "./iDomainEvent";

export interface IHandle<IDomainEvent> {
  setupSubscriptions(): void;
}
