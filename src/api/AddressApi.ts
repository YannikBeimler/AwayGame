import { get, post } from "./Requests";
import { Address } from "../../api/model/address";

class AddressApi {
  public async readAddress(id: number): Promise<Address> {
    console.log(id);
    const json = await get(`${process.env.REACT_APP_BASE_API}/addressByUser/${id}`);
    return json as Address;
  }

  public async saveAddress(userId: number, formData: any): Promise<void> {
    console.log(formData);
    await post(`${process.env.REACT_APP_BASE_API}/user/${userId}/address`, formData);
  }
}

export default new AddressApi();
