import React from "react";
import Index from "./pages/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FirstPage } from "./components";
import "./app.less";

function App() {
  return (
    <div>
      <FirstPage />
      <Router>
        <Switch>
          <Route exact path="" component={Index} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
