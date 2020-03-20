import React from "react";
import Index from "./pages/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="" component={Index} />
      </Switch>
    </Router>
  );
}

export default App;
