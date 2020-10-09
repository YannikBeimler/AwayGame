import { Address } from "./address";
import { Offer } from "./offer";
import { User } from "./user";

export class Application {
  readonly id: number;
  date: Date;
  accepted: boolean;

  offerId: number = -1;
  userId: number = -1;
  addressId: number = -1;

  offer?: Offer;
  user?: User;
  address?: Address;

  constructor(id: number, date: Date, accepted: boolean, offer?: Offer, user?: User, address?: Address) {
    this.id = id;
    this.date = date;
    this.accepted = accepted;
    this.offer = offer;
    this.user = user;
    this.address = address;
  }
}
