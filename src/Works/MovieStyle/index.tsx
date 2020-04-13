import React, { useRef, useEffect, useState } from "react";
import useMovieStyle from "./hook";
import { Upload, InputNumber } from "antd";
import { moveElement } from "utils";
import "./style.less";
const { Dragger } = Upload;

export default function MovieStyle() {
  let initTop = 0;
  const RightBar: any = useRef(null);
  const RightBarTitle: any = useRef(null);
  const cav: any = useRef(null);
  const [mobileMode, setMobileMode] = useState(
    document.documentElement.clientWidth <= 1080
  );

  useEffect(() => {
    window.onresize = () => {
      const checkMode = document.documentElement.clientWidth <= 1080;
      setMobileMode(checkMode);
      if (!checkMode) {
        RightBar.current.style.top = "unset";
        RightBar.current.style.left = "unset";
      }
    };
  }, []);

  const {
    photo,
    photoInfo,
    DraggerProps,
    isLoad,
    changeInfo,
    save,
  } = useMovieStyle(cav);

  const moveRightBar = (e: any) => {
    if (initTop === 0) initTop = RightBar.current.offsetTop;
    const maxMoveSize = window.innerHeight - RightBar.current.offsetHeight;
    let top = e.touches[0].clientY - RightBarTitle.current.offsetHeight / 2;
    if (top > maxMoveSize && top < window.innerHeight * 0.7 + 50) {
      top = top - initTop;
      RightBar.current.style.transform = `translate3d(0, ${top}px, 0px)`;
    }
  };

  return (
    <div className="MovieStyle">
      <div className={`Content  ${isLoad && "LoadContent"}`}>
        <canvas style={{ display: "none" }} ref={cav} />
        <img id="canvas" src={photo.imgSrc} alt="" />
        {!isLoad && (
          <Dragger {...DraggerProps}>
            <span className="Upload">选择图像</span>
          </Dragger>
        )}
      </div>
      <div ref={RightBar} className={`RightBar ${isLoad && "LoadRight"}`}>
        <div
          ref={RightBarTitle}
          className="Title"
          onTouchMove={moveRightBar}
          onMouseMove={() => {
            if (mobileMode) {
              moveElement(RightBarTitle.current, RightBar.current, true);
            }
          }}
        >
          工作台
        </div>
        <div className={`${!isLoad && "disabled"}`}>
          <div className="ItemModule ImgInfo">
            <div className="ModuleTitle">基本信息</div>
            <div>宽度：{photo.height}</div>
            <div>
              高度：{photo.width} 修改后：
              {photo.height + photoInfo.top + photoInfo.bottom}
            </div>
            <div>
              平均色值：
              <span className="color" style={{ borderColor: photo.color }}>
                {photo.color}
              </span>
            </div>
          </div>
          <div className="ItemModule Inputs">
            <div className="ModuleTitle">参数调整</div>
            <div>
              上边距：
              <InputNumber
                value={photoInfo.top}
                size="small"
                min={0}
                onChange={(value: any) => changeInfo("top", value)}
                defaultValue={photoInfo.top}
              />
            </div>
            <div>
              下边距：
              <InputNumber
                value={photoInfo.bottom}
                size="small"
                min={0}
                onChange={(value: any) => changeInfo("bottom", value)}
                defaultValue={photoInfo.bottom}
              />
            </div>
            <div>
              遮罩颜色：
              <input
                className="colorPicker"
                type="color"
                value={photoInfo.color}
                onChange={(e: any) => changeInfo("color", e.target.value)}
              />
            </div>
            <div className="footerBtns">
              <div className="save" onClick={save}>
                保存
              </div>
              <span className="replitImg">
                <Upload {...DraggerProps}>更换图像</Upload>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
