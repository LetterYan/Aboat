import React from "react";
import { useHistory } from "react-router-dom";
import { sysConfig, useStore } from "../../stores";
import { routerList } from "../../constant";
import useSider from "./hook";

export default function SideBar() {
  const history = useHistory();
  const { Styled } = useSider();
  const { routerPath } = useStore(sysConfig);

  const link = (path: string) => history.push(path);

  return (
    <Styled.Sider>
      {routerList.map((item: any, index: number) => {
        return (
          <Styled.MenuItem
            key={item.name}
            onClick={() => link(item.path)}
            isActive={routerPath === item.path}
          >
            {item.name}
          </Styled.MenuItem>
        );
      })}
    </Styled.Sider>
  );
}
