import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import { SideBar } from "../../components";
import { ColorUtils } from "../../utils";
import "./style.less";

const imgList = require
  .context("../../static/image/carousel/")
  .keys()
  .map((str: any) => ({
    path: require(`../../static/image/carousel/${str.replace("./", "")}`),
    color: "",
  }));

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [bgColor, setBgColor] = useState("");

  const getColor = async () => {
    if (imgList[current].color) {
      setBgColor(imgList[current].color);
    } else {
      imgList[current].color = await ColorUtils.colorfulImg(
        imgList[current].path
      );
      setBgColor(imgList[current].color);
    }
  };

  useEffect(() => {
    getColor();
  }, [current]);

  return (
    <div className="Content">
      <div className="Layout">
        <SideBar />
        <div className="CarouselBox">
          <Carousel autoplay beforeChange={(f, t) => setCurrent(t)}>
            {imgList.map(
              ({ path }) => path && <img alt="" key={path} src={path} />
            )}
          </Carousel>
        </div>
        <div className="BgCarousel" style={{ backgroundColor: bgColor }} />
      </div>
    </div>
  );
}
