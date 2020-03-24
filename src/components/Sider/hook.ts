import { useState } from "react";
import styled from "styled-components";
import { sysConfig, useStore, changeSysConfig } from "../../stores";

export default function useSider() {
  const { _sider } = useStore(sysConfig);
  const [collapsedWidth, setCollapsedWidth] = useState(80);

  const onCollapse = () =>
    changeSysConfig("_sider.collapsed", !_sider.collapsed);

  const Styled = {
    Block: styled.div`
      width: 100%;
      height: 80px;
      text-align: center;
      line-height: 80px;
      user-select: none;
      font-size: 26px;
    `
  };

  return { Styled, onCollapse, collapsedWidth, setCollapsedWidth, _sider };
}
