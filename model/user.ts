import { Address } from "./address";

export class User {
    id: number;
    name: string;
    mail: string;
    password: string;

    addresses: Address[];
}