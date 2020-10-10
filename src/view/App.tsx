import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginScreen } from "./login/loginscreen";
import Games from "./games/games";
import GameDetail from "./games/gameDetail";
import Offers from "./offers/offers";
import OfferNew from "./offers/offerNew";

const App: FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginScreen />
        </Route>
        <Route exact path="/games">
          <Games />
        </Route>
        <Route exact path="/games/:id" component={GameDetail} />
        <Route exact path="/games/:id/offers" component={Offers} />
        <Route exact path="/games/:id/offers/new" component={OfferNew} />
      </Switch>
    </Router>
  );
};

export default App;
