import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { changeSysConfig } from "../../stores";
import { SideBar } from "../../components";
import styled from "styled-components";
import Home from "../home";

const routerPath = [{ key: 1, path: "/" }];

function bar() {
  return <div>sdada</div>;
}

export default function Index() {
  const history = useHistory();

  const Layout = styled.div`
    min-height: 100vh;
    display: flex;
    flex: auto;
  `;

  useEffect(() => {
    const current = routerPath.find(
      item => item.path === history.location.pathname
    );
    if (current) changeSysConfig({ routerKey: current.key });
  }, [history.location.pathname]);

  return (
    <Layout>
      <SideBar />
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
          onEnter={() => {
            console.log(123);
          }}
        />
        <Route path="/bar" component={bar} />
      </Switch>
    </Layout>
  );
}
