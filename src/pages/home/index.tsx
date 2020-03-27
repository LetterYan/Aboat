import React from "react";
import { Carousel } from "antd";
import useCarousel from "./hook";

export default function Home() {
  const { Styled } = useCarousel();
  const arr = Array.from(new Array(1).keys());

  return (
    <Styled.Content>
      <Styled.Layout>
        <Carousel autoplay>
          {arr.map((item: number) => {
            return (
              <Styled.ItemBox
                key={item}
                src={require(`../../../static/image/item${item}.jpg`)}
              />
            );
          })}
        </Carousel>
        <div style={{ height: "100vh", width: "100vw" }} />
      </Styled.Layout>
    </Styled.Content>
  );
}
