import React from "react";
import useArts from "./hook";

export default function Arts() {
  const { list, Styled, clickFN } = useArts();
  const { Layout, ItemBox, ImageBox, Img } = Styled;

  return (
    <Layout>
      {[...new Array(20).keys()].map(item => {
        let num = Math.round(Math.random());
        return (
          <ItemBox onClick={clickFN} key={item}>
            <ImageBox>
              <Img src={list[num].url} alt={list[num].name} />
            </ImageBox>
            <div>{list[num].name}</div>
            <div>{list[num].time}</div>
          </ItemBox>
        );
      })}
    </Layout>
  );
}
