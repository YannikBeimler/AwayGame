import { get, post } from "./Requests";
import { Offer } from "../../api/model/offer";

class OffersApi {
  public async createOffer(formData: Offer): Promise<void> {
    await post(`${process.env.REACT_APP_BASE_API}/offers/`, formData);
  }

  public async readOffer(offerId: number): Promise<Offer> {
    const json = await get(`${process.env.REACT_APP_BASE_API}/offers/${offerId}`);
    return json as Offer;
  }

  public async readOffers(gameId: number): Promise<Offer[]> {
    const json = await get(`${process.env.REACT_APP_BASE_API}/games/${gameId}/offers`);
    return json as Offer[];
  }
}

export default new OffersApi();
