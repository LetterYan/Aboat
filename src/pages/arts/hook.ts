import { notification } from "antd";
import styled from "styled-components";

const list = [
  {
    name: "google",
    time: "2019",
    url:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    name: "google",
    time: "2019",
    url:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    name: "google",
    time: "2019",
    url:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    name: "google",
    time: "2019",
    url:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    name: "google",
    time: "2019",
    url:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    name: "google",
    time: "2019",
    url:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    name: "google",
    time: "2019",
    url:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    name: "google",
    time: "2019",
    url:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    name: "google",
    time: "2019",
    url:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  }
];

export default function useArts() {
  const Styled = {
    Layout: styled.div`
      width: 100%;
      padding: 20px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
    `,
    ItemBox: styled.div`
      height: 280px;
      width: 200px;
      padding: 20px;
      margin: 10px;
      cursor: pointer;
      overflow: hidden;
      border-radius: 4px;
      transition: all 0.3s;
      display: inline-block;
      :hover {
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.15);
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
