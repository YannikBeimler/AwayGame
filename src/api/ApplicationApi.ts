import { get, post } from "./Requests";
import { Application } from "../../api/model/application";

class ApplicationApi {
  public async createApplication(offerId: number, addressId: number, userId: number): Promise<void> {
    await post(
      `${process.env.REACT_APP_BASE_API}/application`,
      JSON.stringify({
        offerId: offerId,
        userId: userId,
        addressId: addressId
      })
    );
  }

  public async applicationByUser(userId: number): Promise<Application[]> {
    const applications = await get(`${process.env.REACT_APP_BASE_API}/user/${userId}/applications`);
    return applications as Application[];
  }
}

export default new ApplicationApi();
