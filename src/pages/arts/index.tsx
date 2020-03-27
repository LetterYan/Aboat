import React from "react";
import useArts from "./hook";

export default function Arts() {
  const { list, Styled, clickFN } = useArts();
  const { Layout, ItemBox, ImageBox, Img } = Styled;

  return (
    <Layout>
      {list.map((item, index) => {
        return (
          <ItemBox onClick={clickFN} key={item.time + index}>
            <ImageBox>
              <Img src={item.url} alt={item.name} />
            </ImageBox>
            <div>{item.name}</div>
            <div>{item.time}</div>
          </ItemBox>
        );
      })}
    </Layout>
  );
}
