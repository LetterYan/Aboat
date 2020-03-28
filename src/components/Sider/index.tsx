import React from "react";
import { Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { HomeOutlined, PictureOutlined } from "@ant-design/icons";
import { sysConfig, useStore, changeSysConfig } from "../../stores";
import { routerList } from "../../constant";
import useSider from "./hook";

const icons = [{ icon: <HomeOutlined /> }, { icon: <PictureOutlined /> }];

export default function SideBar() {
  const history = useHistory();
  const { Styled } = useSider();
  const { routerPath, theme } = useStore(sysConfig);

  const link = (path: string) => history.push(path);

  const clickLogo = () => {
    changeSysConfig({ theme: theme === "darkMode" ? "skyBlue" : "darkMode" });
  };

  return (
    <Styled.Sider>
      <Tooltip placement="right" title="😏">
        <Styled.Logo onClick={clickLogo} />
      </Tooltip>
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
