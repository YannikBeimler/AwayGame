import { get } from "./Requests";
import { Game } from "../../api/model/game";

class GamesApi {
  public async readGames(): Promise<Game[]> {
    const json = await get(`${process.env.REACT_APP_BASE_API}/games`);
    return json as Game[];
  }
}

export default new GamesApi();
