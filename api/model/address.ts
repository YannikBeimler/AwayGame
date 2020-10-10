export class Address {
  id: number;
  street: string;
  city: string;
  latitude: number;
  longitude: number;

  userId: number = -1;

  // improvement for profilescreen
  strLatitude: string;
  strLongitude: string;

  constructor(id: number, street: string, city: string, latitude: number, longitude: number) {
    this.id = id;
    this.street = street;
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
    this.strLatitude = latitude + " ";
    this.strLongitude = longitude + " ";
  }

  getAddressString(): string {
    return this.street + " " + this.city;
  }
}
