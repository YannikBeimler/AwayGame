
class Logout {
  public logout() {
    localStorage.setItem("currentUser", "");
  }
}

export default new Logout();
