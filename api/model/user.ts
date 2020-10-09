import { Address } from "./address";

export class User {
    readonly id: number;
    name: string;
    mail?: string;
    password?: string;

    addresses: Address[];

    constructor(id: number, name: string, mail?: string, password?: string, addresses?: Address[]) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.password = password;
        this.addresses = addresses || [];
    }
}