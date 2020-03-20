import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { sysConfig, useStore, changeSysConfig } from "../../stores";
import Styled from "./styled";

export default function SideBar() {
  const history = useHistory();
  const { _sider } = useStore(sysConfig);
  const [collapsedWidth, setCollapsedWidth] = useState(80);

  const onCollapse = () =>
    changeSysConfig("_sider.collapsed", !_sider.collapsed);

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
