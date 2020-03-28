import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Index from "./pages/index";
import { FirstPage } from "./components";
import { sysConfig, useStore } from "./stores";
import Themes from "./theme/themes";
import GlobalStyle from "./theme/createGlobalStyle";
import "./app.less";

function App() {
  // const [dark, setDark]: any = useState();
  const { theme } = useStore(sysConfig);
  // if (theme === "darkMode") {
  //   if (dark) {
  //     dark.disabled = false;
  //   } else {
  //     require("antd/dist/antd.dark.less");
  //     const styleTags = document.getElementsByTagName("style");
  //     const darkTag = styleTags[styleTags.length - 1];
  //     if ((darkTag.type = "text/css")) setDark(darkTag);
  //   }
  // } else if (dark) {
  //   dark.disabled = true;
  // }

  return (
    <Router>
      <ThemeProvider theme={Themes[theme]}>
        <GlobalStyle />
        <FirstPage />
        <Index />
      </ThemeProvider>
    </Router>
  );
}

export default App;
