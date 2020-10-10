import { Address } from "./address";

export class User {
    readonly id: number;
    name: string;
    adressFK?: number
    mail?: string;
    password?: string;

    addresses: Address[];

    constructor(id: number, name: string, adressFK?: number, mail?: string, password?: string, addresses?: Address[]) {
        this.id = id;
        this.name = name;
        this.adressFK = adressFK;
        this.mail = mail;
        this.password = password;
        this.addresses = addresses || [];
    }
}