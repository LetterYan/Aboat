import React, { useRef } from "react";
import useMovieStyle from "./hook";
import { Upload, InputNumber } from "antd";
import "./style.less";
const { Dragger } = Upload;

export default function MovieStyle() {
  const cav = useRef(null);
  const {
    photo,
    photoInfo,
    DraggerProps,
    isLoad,
    changeInfo,
    save,
  } = useMovieStyle(cav);

  return (
    <div className="MovieStyle">
      <div className="Content" style={{ width: isLoad ? "80%" : "100%" }}>
        <canvas
          id="canvas"
          style={{ display: isLoad ? "inline-block" : "none" }}
          ref={cav}
        />
        {!isLoad && (
          <Dragger {...DraggerProps}>
            <span className="Upload">选择图像</span>
          </Dragger>
        )}
      </div>
      <div
        className="RightBar"
        style={{
          transform: `translate3d(${isLoad ? "0%" : "100%"}, 0px, 0px)`,
        }}
      >
        <div className="Title">工作台</div>
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
        </div>
        <div className="footerBtns">
          <div className="save" onClick={save}>
            保存
          </div>
        </div>
      </div>
    </div>
  );
}
