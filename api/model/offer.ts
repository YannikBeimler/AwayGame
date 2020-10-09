import { Address } from "./address";
import { Game } from "./game";
import { User } from "./user";
import { Application } from "./application";

export class Offer {
  readonly id: number;
  transportation: boolean; // 0: Train; 1: Car
  date: Date;
  places: number;
  freePlaces: number;
  peopleCount: number;
  sector: string;

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
    freePlaces: number,
    peopleCount: number,
    sector: string,
    game?: Game,
    user?: User,
    address?: Address,
    applications?: Application[]
  ) {
    this.id = id;
    this.transportation = transportation;
    this.date = date;
    this.places = places;
    this.freePlaces = freePlaces;
    this.peopleCount = peopleCount;
    this.sector = sector;
    this.game = game;
    this.user = user;
    this.address = address;
    this.applications = applications || [];
  }

  getAddressString(): string {
    if (!this.address) return "";
    return this.address.getAddressString();
  }
}
