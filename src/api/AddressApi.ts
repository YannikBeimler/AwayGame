import { get, post } from "./Requests";
import { Address } from "../../api/model/address";

class AddressApi {
  public async readAddress(id: string): Promise<Address> {
    console.log('id' + id)
    const json = await get(`${process.env.REACT_APP_BASE_API}/addressByUser/${id}`);
    console.log(json as Address)
    return json as Address;
  }

  public async saveAddress(formData: any): Promise<void> {
    console.log(formData)
    await post(`${process.env.REACT_APP_BASE_API}/addressUpdate/`, formData);
  }
}

export default new AddressApi();