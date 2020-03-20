import React from "react";
import { Layout } from "antd";
const { Content, Footer } = Layout;

export default function Home() {
  return (
    <Layout className="site-layout">
      <Content style={{ margin: "16px" }}>A boat</Content>
      <Footer style={{ textAlign: "center" }}>A boat</Footer>
    </Layout>
  );
}
