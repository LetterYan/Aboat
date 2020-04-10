import React from "react";
import useFeed from "./hook";

const list = [
  { path: require("../../static/image/alipay.jpg") },
  { path: require("../../static/image/wechatpay.jpg") },
];

export default function Feed() {
  const { Styled } = useFeed();
  return (
    <Styled.Layout>
      <Styled.Title>老板大气 感谢老板投食喂养 ToT orz</Styled.Title>
      <Styled.Wrapper>
        {list.map((item) => {
          return (
            <Styled.ItemBox key={item.path}>
              <Styled.Img src={item.path} title="求赞助" />
            </Styled.ItemBox>
          );
        })}
      </Styled.Wrapper>
    </Styled.Layout>
  );
}
