import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginScreen } from "./login/loginscreen";
import { Games } from "./games/games";
import "reflect-metadata";

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
      </Switch>
    </Router>
  );
};

export default App;
