import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../../components";
import Home from "../home";
import Feed from "../feed";
import Arts from "../arts";

export default function Index() {
  const Layout = styled.div`
    min-height: 100vh;
    display: flex;
    flex: auto;
  `;

  const Content = styled.div`
    width: 100%;
  `;

  return (
    <Layout>
      <Content>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/arts" component={Arts} />
          <Route path="/feed" component={Feed} />
        </Switch>
      </Content>
    </Layout>
  );
}
