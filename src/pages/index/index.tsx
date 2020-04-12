import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "../home";

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
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Content>
    </Layout>
  );
}
