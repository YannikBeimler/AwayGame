import { User } from "../../../api/model/user";

class Login {
  public getCurrentUser(): User {
    const c = localStorage.getItem("currentUser");
    if (c) {
      const json = JSON.parse(c);
      const user = json as User;
      if (user.id > 0) return user;
    }
    const u = { id: -1, name: "Logged Out" };
    const nullUser = u as User;
    return nullUser;
  }
}

export default new Login();
