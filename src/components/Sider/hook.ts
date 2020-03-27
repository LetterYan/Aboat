import styled from "styled-components";

interface ActiveProps {
  isActive: boolean;
  theme: any;
}

export default function useSider() {
  const Styled = {
    Sider: styled.div`
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      height: 100vh;
      min-width: 200px;
      box-shadow: 0 0 6px 0px rgba(0, 0, 0, 0.12);
      background: ${props => props.theme.bgColor};
    `,
    MenuItem: styled.div`
      cursor: pointer;
      height: 48px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s;
      overflow: hidden;
      border-right: 3px solid ${props => props.theme.bgColo};
      color: ${(props: ActiveProps) =>
        props.isActive ? props.theme.active.fontColor : props.theme.fontColor};
      background: ${(props: ActiveProps) =>
        props.isActive ? props.theme.active.bgColor : props.theme.bgColor};
      border-color: ${(props: ActiveProps) =>
        props.isActive ? props.theme.active.fontColor : props.theme.bgColor};
      :hover {
        color: ${props => props.theme.active.fontColor};
        background: ${props => props.theme.active.bgColor};
        border-color: ${props => props.theme.active.fontColor};
      }
    `,
    Name: styled.span`
      margin-left: 10px;
      font-size: 14px;
    `,
    Block: styled.div`
      width: 100%;
      height: 80px;
      text-align: center;
      line-height: 80px;
      user-select: none;
      font-size: 26px;
      color: ${props => props.theme.fontColor};
    `
  };

  return { Styled };
}
