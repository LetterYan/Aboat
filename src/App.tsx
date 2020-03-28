import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Index from "./pages/index";
import { FirstPage } from "./components";
import { sysConfig, useStore } from "./stores";
import Themes from "./theme/themes";
import "./app.less";

function App() {
  const { theme } = useStore(sysConfig);
  return (
    <Router>
      <ThemeProvider theme={Themes[theme]}>
        <FirstPage />
        <Index />
      </ThemeProvider>
    </Router>
  );
}

export default App;
