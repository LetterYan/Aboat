import styled from "styled-components";

interface ActiveProps {
  theme: any;
}

export default function useSider() {
  const Styled = {
    Sider: styled.div`
      width: 30%;
      @media (max-width: 1080px) {
        width: 100%;
      }
    `,
    MenuItem: styled.div`
      transition: all 0.3s cubic-bezier(1, 0.38, 0, 1.26);
      cursor: pointer;
      width: 100%;
      font-size: 60px;
      font-weight: bold;
      line-height: 80px;
      text-align: center;
      font-style: oblique;
      color: ${(props: ActiveProps) => props.theme.fontColor};
      background: ${(props: ActiveProps) => props.theme.viewBgColor};
      :hover {
        line-height: 110px;
      }
    `,
  };

  return { Styled };
}
