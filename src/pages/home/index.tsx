import React from "react";
import { Carousel } from "antd";
import useCarousel from "./hook";
import styled from "styled-components";

export default function Home() {
  const { Styled } = useCarousel();
  const arr = Array.from(new Array(1).keys());

  const Content = styled.div`
    padding: 20px;
    width: 100%;
    background: #f0f0f0;
  `;

  return (
    <Content>
      <Carousel autoplay>
        {arr.map((item: number) => {
          return (
            <Styled.itemBox
              key={item}
              src={require(`../../../static/image/item${item}.jpg`)}
            />
          );
        })}
      </Carousel>
    </Content>
  );
}
