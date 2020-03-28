import { useEffect } from "react";
import styled from "styled-components";
import { notification } from "antd";

export default function useFeed() {
  const helpMe = () => {
    notification.warning({
      duration: 3,
      message: "少侠，救救这个孩子吧",
      description: "这个孩子就快饿死了啊 少侠"
    });
  };
  useEffect(helpMe, []);
  setInterval(helpMe, 10000);
  const Styled = {
    Layout: styled.div`
      border: ${props => props.theme.primaryColor} 5px double;
      padding: 20px;
      padding-bottom: 60px;
      background: ${props => props.theme.viewBgColor};
    `,
    Title: styled.h1`
      text-align: center;
      margin-bottom: 80px;
    `,
    Wrapper: styled.div`
      margin: auto;
      display: flex;
      max-width: 1280px;
      align-items: center;
      justify-content: space-evenly;
    `,
    ItemBox: styled.div``,
    Img: styled.img`
      width: 20rem;
      cursor: help;
      transition: all 0.3s cubic-bezier(0.89, -0.71, 0, 1.51);
      :hover {
        transform: translate3d(0, -40px, 0);
      }
    `
  };
  return { Styled };
}
