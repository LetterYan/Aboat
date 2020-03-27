import styled from "styled-components";

export default function useHeader() {
  const Styled = {
    Header: styled.header`
      width: 100%;
      height: 55px;
      background: rgba(255, 255, 255, 0.75);
      position: sticky;
      top: 0;
      z-index: 98;
      backdrop-filter: blur(8px);
    `,
    Title: styled.span`
      font-size: 22px;
      margin-left: 30px;
      line-height: 55px;
    `
  };
  return { Styled };
}
