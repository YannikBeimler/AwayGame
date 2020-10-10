import { get } from "./Requests";
import { User } from "../../api/model/user";

class LoginApi {
  public async login(userName: string): Promise<User> {
    const json = await get(`${process.env.REACT_APP_BASE_API}/login/${userName}`);
    return json as User;
  }
}

export default new LoginApi();
