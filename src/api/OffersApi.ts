import { get } from "./Requests";
import { Offer } from "../../api/model/offer";

class OffersApi {
  public async readOffer(offerId: number): Promise<Offer> {
    const json = await get(`${process.env.REACT_APP_BASE_API}/offers/${offerId}`);
    return json as Offer;
  }

  public async readOffersByGame(gameId: number): Promise<Offer[]> {
    const json = await get(`${process.env.REACT_APP_BASE_API}/games/${gameId}/offers`);
    return json as Offer[];
  }

  public async readOffersByUser(userId: number): Promise<Offer[]> {
    const json = await get(`${process.env.REACT_APP_BASE_API}/users/${userId}/offers`);
    return json as Offer[];
  }
}

export default new OffersApi();
