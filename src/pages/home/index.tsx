import React from "react";
import { Layout, Carousel } from "antd";
import useCarousel from "./hook";
const { Content, Footer } = Layout;

export default function Home() {
  const { Styled } = useCarousel();
  const arr = Array.from(new Array(1).keys());

  return (
    <Layout className="site-layout">
      <Content style={{ margin: "20px" }}>
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
      <Footer style={{ textAlign: "center" }}>Hello World</Footer>
    </Layout>
  );
}
