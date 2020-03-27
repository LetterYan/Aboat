import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { changeSysConfig } from "../../stores";
import { SideBar, Header } from "../../components";
import { routerList } from "../../constant";
import styled from "styled-components";
import Home from "../home";
import Arts from "../arts";

function bar() {
  return <div>sdada</div>;
}

export default function Index() {
  const [title, setTitle] = useState("A boat");
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

    if (current) {
      setTitle(current.title);
      changeSysConfig({ routerKey: current.path });
    }
  }, [history.location.pathname]);

  return (
    <Layout>
      <SideBar />
      <Content>
        <Header title={title} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/bar" component={bar} />
          <Route path="/arts" component={Arts} />
        </Switch>
      </Content>
    </Layout>
  );
}
