import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Header } from "components";
import Home from "../home";

const WorksList = require
  .context("../../Works", true, /.\/(.*)\/$/)
  .keys()
  .map((str) => str.replace(/(\/)|(\.)/g, ""))
  .map((item) => ({
    key: item,
    path: "/Works/" + item,
    component: require(`../../Works/${item}`).default,
  }));

export default function Index() {
  const Layout = styled.div`
    min-height: 100vh;
    display: flex;
    flex: auto;
    background: #00000075;
  `;

  const Content = styled.div`
    width: 100%;
  `;

  return (
    <Layout>
      <Content>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Works">
            <Header />
            {WorksList.map((item) => (
              <Route
                path={item.path}
                key={item.key}
                component={item.component}
              />
            ))}
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
}
