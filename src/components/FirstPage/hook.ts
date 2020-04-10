import styled, { keyframes } from "styled-components";

export default function useFirstPage() {
  const opacityAnime = keyframes`
    0% {
      opacity: 1 ;
    }

    100% {
      opacity: 0;
      z-index: -1;
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
      background-color: ${(props: any) => props.theme.primaryColor};
      animation: 1s ${opacityAnime} 1.5s cubic-bezier(0.45, -0.14, 0.18, 0.82)
        forwards;
    `,

    Span: styled.span`
      padding: 0 10px;
      font-style: italic;
      background: ${() => {
        const color1 = randomColor();
        const color2 = randomColor();
        return `linear-gradient(to right, ${color1}, ${color2});`;
      }};
      animation: ${moveAnime} 1s cubic-bezier(1, -0.9, 0.35, 1.32) forwards;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
    `,
  };
  const randomColor = () =>
    "#" +
    ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6);
  return { Styled };
}
