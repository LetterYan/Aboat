import styled from "styled-components";

export default function useCarousel() {
  const Styled = {
    Content: styled.div`
      width: 100%;
      padding: 20px;
      min-height: 100vh;
      background: ${props => props.theme.viewBgColor};
    `,
    Layout: styled.div`
      max-width: 1440px;
      margin: 0 auto;
    `,
    ItemBox: styled.img`
      width: 100%;
    `
  };
  return { Styled };
}
