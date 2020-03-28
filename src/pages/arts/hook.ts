import { notification } from "antd";
import styled from "styled-components";

const list = [
  {
    name: "Google",
    time: "2020",
    url: require("../../static/image/google.png")
  },
  {
    name: "少侠",
    time: "2020",
    url: require("../../static/logo.svg")
  }
];

export default function useArts() {
  const Styled = {
    Layout: styled.div`
      background: ${props => props.theme.viewBgColor};
      width: 100%;
      padding: 20px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
    `,
    ItemBox: styled.div`
      color: ${props => props.theme.fontColor};
      height: 280px;
      width: 200px;
      padding: 20px;
      margin: 20px 10px;
      cursor: pointer;
      overflow: hidden;
      border-radius: 4px;
      transition: all 0.3s;
      display: inline-block;
      :hover {
        box-shadow: 0 0 10px 2px ${props => props.theme.boxShadow};
        transform: matrix3d(1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        img {
          width: 90%;
        }
      }
    `,
    ImageBox: styled.div`
      width: 100%;
      height: 200px;
      display: flex;
      overflow: hidden;
      align-items: center;
      justify-content: center;
    `,
    Img: styled.img`
      width: 100%;
      transition: all 0.3s;
    `
  };

  const clickFN = () => {
    notification.error({
      message: "A boat 警告",
      description: "功能尚未实现"
    });
  };

  return { list, Styled, clickFN };
}
