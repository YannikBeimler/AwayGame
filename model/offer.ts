import { Address } from "./address";
import { Game } from "./game";
import { User } from "./User";

export class Offer {
    id: number;
    transportation: boolean; // 0: Train; 1: Car
    date: Date;
    freePlaces: number;

    game: Game;
    user: User;
    address: Address;
}