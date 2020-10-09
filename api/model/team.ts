import { Address } from "./address";

export class Team {
    readonly id: number;
    name: string;
    logoPath: string;

    address?: Address;

    constructor(id: number, name: string, logoPath: string, address?: Address) {
        this.id = id;
        this.name = name;
        this.logoPath = logoPath;
        this.address = address;
    }
}