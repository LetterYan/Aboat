import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout } from "antd";
import { SideBar } from "../../components";
import Home from "../home";

function bar() {
  return <div>sdada</div>;
}

export default function Index() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/bar" component={bar} />
      </Switch>
    </Layout>
  );
}
