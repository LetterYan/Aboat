import styled from "styled-components";
import { sysConfig, useStore } from "../../stores";

export default function useHeader() {
  const { routerPath } = useStore(sysConfig);

  const Styled = {
    Header: styled.header`
      display: none;
      width: 100%;
      height: 55px;
      background: ${(props) => props.theme.headerBgColor};
      position: sticky;
      top: 0;
      z-index: 98;
      backdrop-filter: blur(8px);
    `,
    Title: styled.span`
      font-size: 22px;
      color: ${(props) => props.theme.fontColor};
      margin-left: 30px;
      line-height: 55px;
    `,
  };
  return { Styled, routerPath };
}
