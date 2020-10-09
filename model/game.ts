import { Team } from "./team";
import {Offer} from "./offer";


export class Game {
    readonly id: number;
    date: Date;

    team1?: Team;
    team2?: Team;

    offers: Offer[];


  constructor(id: number, date: Date, team1?: Team, team2?: Team, offers?: Offer[]) {
    this.id = id;
    this.date = date;
    this.team1 = team1;
    this.team2 = team2;
    this.offers = offers || [];
  }
}