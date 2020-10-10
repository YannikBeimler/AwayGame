export class Address {
  readonly id: number;
  street: string;
  city: string;
  latitude: number;
  longitude: number;

  constructor(id: number, street: string, city: string, latitude: number, longitude: number) {
    this.id = id;
    this.street = street;
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getAddressString(): string {
    return this.street + " " + this.city;
  }
}
