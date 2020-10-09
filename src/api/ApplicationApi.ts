import { post } from "./Requests";

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
}

export default new ApplicationApi();
