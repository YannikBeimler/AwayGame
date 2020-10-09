import { Address } from "./address";
import { Offer } from "./offer";
import { User } from "./User";

export class Application {
    id: number;
    date: Date;
    accepted: boolean;

    offer: Offer;
    user: User;
    address: Address;
}