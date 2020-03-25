import React from "react";
import { useHistory } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { sysConfig, useStore } from "../../stores";
import useSider from "./hook";

const routerPath = [
  {
    key: 1,
    path: "/",
    name: "A boat",
    icon: <HomeOutlined />
  }
];

export default function SideBar() {
  const history = useHistory();
  const { Styled } = useSider();
  const { routerKey } = useStore(sysConfig);

  const link = (path: string) => history.push(path);

  return (
    <Styled.Sider>
      <Styled.Block onClick={() => link("/")}>A boat</Styled.Block>
      <div>
        {routerPath.map(item => {
          return (
            <Styled.MenuItem
              key={item.key}
              onClick={() => link(item.path)}
              isActive={routerKey === item.key}
            >
              {item.icon}
              <Styled.Name>{item.name}</Styled.Name>
            </Styled.MenuItem>
          );
        })}
      </div>
    </Styled.Sider>
  );
}
