import React, { useRef, useEffect, useState } from "react";
import useMovieStyle from "./hook";
import { Upload, InputNumber, Radio, Input, Checkbox, Slider } from "antd";
import { moveElement } from "utils";
import "./style.less";
const { Dragger } = Upload;

export default function MovieStyle() {
  let initTop = 0;
  const RightBar: any = useRef(null);
  const RightBarTitle: any = useRef(null);
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
    imgDom,
  } = useMovieStyle();

  const moveRightBar = (e: any) => {
    if (initTop === 0) initTop = RightBar.current.offsetTop;
    const maxMoveSize = window.innerHeight - RightBar.current.offsetHeight;
    let top = e.touches[0].clientY - RightBarTitle.current.offsetHeight / 2;
    if (top > maxMoveSize && top < window.innerHeight * 0.7 + 50) {
      top = top - initTop;
      RightBar.current.style.transform = `translate3d(0, ${top}px, 0px)`;
    }
  };

  const TextSwitch = [
    {
      type: "topOrBottom",
      values: [
        { val: "top", text: "上" },
        { val: "bottom", text: "下" },
      ],
    },
    {
      type: "leftOrRight",
      values: [
        { val: "left", text: "左" },
        { val: "center", text: "中" },
        { val: "right", text: "右" },
      ],
    },
  ];

  const margin = <>&nbsp;&nbsp;</>;

  return (
    <div className="MovieStyle">
      <div className={`Content  ${isLoad && "LoadContent"}`}>
        <img alt="" ref={imgDom} id="canvas" hidden={!isLoad} />
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
        <div className={`RightBarContent ${!isLoad && "disabled"}`}>
          <div className="ItemModule ImgInfo">
            <div className="ModuleTitle">基本信息</div>
            <div>
              宽度{margin}
              {photo.height}
            </div>
            <div>
              高度{margin}
              {photo.width}
              {margin}->{margin}
              {photo.height + photoInfo.top + photoInfo.bottom}
            </div>
            <div>
              平均色值{margin}
              <span className="color" style={{ borderColor: photo.color }}>
                {photo.color}
              </span>
            </div>
          </div>
          <div className="ItemModule">
            <div className="ModuleTitle">遮罩调整</div>
            <div>
              颜色{margin}
              <input
                className="colorPicker"
                type="color"
                value={photoInfo.color}
                onChange={(e: any) => changeInfo("color", e.target.value)}
              />
            </div>
            <div>
              上边距{margin}
              <InputNumber
                value={photoInfo.top}
                size="small"
                min={0}
                onChange={(value = 0) => changeInfo("top", value)}
                defaultValue={photoInfo.top}
              />
            </div>
            <div>
              下边距{margin}
              <InputNumber
                value={photoInfo.bottom}
                size="small"
                min={0}
                onChange={(value = 0) => changeInfo("bottom", value)}
                defaultValue={photoInfo.bottom}
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
          <div className="ItemModule">
            <div className="ModuleTitle">文字调整</div>
            <Input
              size="small"
              className="Block"
              placeholder="你好？少侠！"
              onChange={(e) => changeInfo("context", e.target.value)}
              value={photoInfo.context}
            />
            <div>
              颜色{margin}
              <input
                className="colorPicker"
                type="color"
                value={photoInfo.fontColor}
                onChange={(e: any) => changeInfo("fontColor", e.target.value)}
              />
            </div>
            <div>
              边距{margin}
              <InputNumber
                min={0}
                size="small"
                value={photoInfo.padding}
                onChange={(val = 0) => changeInfo("padding", val)}
              />
            </div>
            <div>
              大小{margin}
              <InputNumber
                min={0}
                size="small"
                value={photoInfo.fontSize}
                onChange={(val = 0) => changeInfo("fontSize", val)}
              />
            </div>
            <div>
              位置{margin}
              <div className="Block">
                <Checkbox
                  checked={photoInfo.textCenter}
                  onChange={(e) => changeInfo("textCenter", e.target.checked)}
                />
                {margin}中央显示
              </div>
              <div>
                {TextSwitch.map((item) => {
                  return (
                    <div className="Block" key={item.type}>
                      <Radio.Group
                        disabled={photoInfo.textCenter}
                        value={photoInfo[item.type]}
                        onChange={(e) => changeInfo(item.type, e.target.value)}
                      >
                        {item.values.map((check) => (
                          <Radio value={check.val} key={check.val}>
                            {check.text}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="ItemModule">
            <div className="ModuleTitle">蒙板调整</div>
            <div>
              颜色{margin}
              <input
                className="colorPicker"
                type="color"
                value={photoInfo.maskColor}
                onChange={(e: any) => changeInfo("maskColor", e.target.value)}
              />
            </div>
            <div>
              透明度{margin}
              <div style={{ paddingLeft: "10px" }}>
                <Slider
                  value={photoInfo.maskOpacity}
                  onChange={(value: any) => changeInfo("maskOpacity", value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
