import { Address } from "./address";
import { Game } from "./game";
import { User } from "./user";
import { Application } from "./application";

export class Offer {
  readonly id: number;
  transportation: boolean; // 0: Train; 1: Car
  date: Date;
  places: number;

  gameString: string = "";
  userString: string = "";

  gameId: number = -1;
  userId: number = -1;
  addressId: number = -1;

  game?: Game;
  user?: User;
  address?: Address;

  applications: Application[];

  constructor(
    id: number,
    transportation: boolean,
    date: Date,
    places: number,
    game?: Game,
    user?: User,
    address?: Address,
    applications?: Application[]
  ) {
    this.id = id;
    this.transportation = transportation;
    this.date = date;
    this.places = places;
    this.game = game;
    this.user = user;
    this.address = address;
    this.applications = applications || [];
  }

  getFreePlaces(): number {
    return this.places - this.applications.filter((a) => a.accepted).length;
  }

  getAddressString(): string {
    if (!this.address) return "";
    return this.address.street + " " + this.address.city;
  }
}
