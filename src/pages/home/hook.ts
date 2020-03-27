import styled from "styled-components";

export default function useCarousel() {
  const Styled = {
    Content: styled.div`
      width: 100%;
      padding: 20px;
      min-height: 100vh;
      background: #f0f0f0;
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
