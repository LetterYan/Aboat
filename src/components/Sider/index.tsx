import React from "react";
import { useHistory } from "react-router-dom";
import { HomeOutlined, PictureOutlined } from "@ant-design/icons";
import { sysConfig, useStore } from "../../stores";
import { routerList } from "../../constant";
import useSider from "./hook";

const icons = [{ icon: <HomeOutlined /> }, { icon: <PictureOutlined /> }];

export default function SideBar(props: any) {
  const history = useHistory();
  const { Styled } = useSider();
  const { routerPath } = useStore(sysConfig);

  const link = (path: string) => history.push(path);

  return (
    <Styled.Sider>
      <Styled.Block onClick={() => link("/")} />
      {routerList.map((item: any, index: number) => {
        return (
          <Styled.MenuItem
            key={item.name}
            onClick={() => link(item.path)}
            isActive={routerPath === item.path}
          >
            {icons[index].icon}
            <Styled.Name>{item.name}</Styled.Name>
          </Styled.MenuItem>
        );
      })}
    </Styled.Sider>
  );
}
