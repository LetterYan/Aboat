import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import styled from "styled-components";
import { SideBar, Header } from "../../components";
import Home from "../home";
import Feed from "../feed";
import Arts from "../arts";
import { routerList } from "../../constant";
import { changeSysConfig } from "../../stores";

export default function Index() {
  const history = useHistory();
  const Layout = styled.div`
    min-height: 100vh;
    display: flex;
    flex: auto;
  `;

  const Content = styled.div`
    width: 100%;
    margin-left: 200px;
  `;

  useEffect(() => {
    const current = routerList.find(
      item => item.path === history.location.pathname
    );
    if (current) changeSysConfig({ routerPath: current.path });
  }, [history.location.pathname]);

  return (
    <Layout>
      <SideBar />
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
