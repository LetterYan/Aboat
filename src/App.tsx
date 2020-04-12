import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Index from "./pages/index";
import { FirstPage } from "components";
import Themes from "theme/themes";
import GlobalStyle from "theme/createGlobalStyle";
import "./app.less";

function App() {

  return (
    <Router>
      <ThemeProvider theme={Themes.default}>
        <GlobalStyle />
        <FirstPage />
        <Index />
      </ThemeProvider>
    </Router>
  );
}

export default App;
