import React from "react";
import Index from "./pages/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FirstPage } from "./components";
import { ThemeProvider } from "styled-components";
import { sysConfig, useStore } from "./stores";
import Themes from "./theme/themes";
import "./app.less";

function App() {
  const { theme } = useStore(sysConfig);
  return (
    <ThemeProvider theme={Themes[theme]}>
      <FirstPage />
      <Router>
        <Switch>
          <Route exact path="" component={Index} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
