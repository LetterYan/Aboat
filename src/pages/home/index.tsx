import React, { useState } from "react";
import { Carousel } from "antd";
import { SideBar } from "../../components";
import { ColorUtils } from "../../utils";
import "./style.less";

export default function Home() {
  const [index, setIndex] = useState(0);
  const arr = [...new Array(3).keys()];
  const createURL = (item: any) =>
    require(`../../static/image/carousel/item${item}.jpg`);
  const getColor = () =>
    setTimeout(() => {
      ColorUtils.colorfulImg(createURL(index));
    }, 30);

  return (
    <div className="Content">
      <div className="Layout">
        <SideBar />
        <div className="CarouselBox">
          <Carousel  beforeChange={(from, to) => setIndex(to)}>
            {arr.map((item) => {
              return <img alt="" key={item} src={createURL(item)} />;
            })}
          </Carousel>
        </div>
        <div
          className="BgCarousel"
          style={{
            backgroundImage: `url(${createURL(index)})`,
            backgroundColor: `${getColor()}`,
          }}
        />
      </div>
    </div>
  );
}
