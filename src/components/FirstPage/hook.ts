import styled, { keyframes } from "styled-components";

export default function useFirstPage() {
  const opacityAnime = keyframes`
    0% {
      opacity: 1 ;
    }

    100% {
      opacity: 0 ;
      z-index:-1;
    }
  `;
  const moveAnime = keyframes`
    from {
      opacity: 0;
      transform: translate3d(-6vw, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  `;

  const Styled = {
    Layout: styled.div`
      display: flex;
      font-size: 120px;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      position: fixed;
      z-index: 999999;
      background-color: white;
      animation: 1s ${opacityAnime} 1.5s cubic-bezier(0.45, -0.14, 0.18, 0.82)
        forwards;
    `,

    H: styled.span`
      animation: ${moveAnime} 1s cubic-bezier(1, -0.9, 0.35, 1.32) forwards;
    `
  };
  return { Styled };
}
