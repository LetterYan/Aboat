import React from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import useSider from "./hook";

export default function SideBar() {
  const history = useHistory();

  const {
    Styled,
    collapsedWidth,
    _sider,
    onCollapse,
    setCollapsedWidth
  } = useSider();

  return (
    <Layout.Sider
      breakpoint="xs"
      collapsedWidth={collapsedWidth}
      theme="light"
      collapsed={_sider.collapsed}
      onCollapse={onCollapse}
      onBreakpoint={status => setCollapsedWidth(status ? 0 : 80)}
    >
      <Styled.Block onClick={() => history.push("/")}>A boat</Styled.Block>
      <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={["1"]}
        style={{ textAlign: "center" }}
      >
        <Menu.Item key="1">
          <HomeOutlined />
          <span>A boat</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
