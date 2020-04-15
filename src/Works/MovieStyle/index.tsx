import React, { Component } from "react";
import {
  Upload,
  InputNumber,
  Radio,
  Input,
  Checkbox,
  Slider,
  Tabs,
} from "antd";
import hook from "./hook";
import "./style.less";

const { Dragger } = Upload;
const { TabPane } = Tabs;

const photoProps = {
  width: 0,
  height: 0,
  src: 0,
  color: "rgb(0, 0, 0)",
  img: new Image(),
};

const photoInfoProps = {
  top: 150,
  bottom: 150,
  padding: 30,
  fontSize: 48,
  context: "",
  color: "#ffffff",
  fontColor: "#ffffff",
  maskColor: "#ffffff",
  maskOpacity: "00",
  textCenter: false,
  topOrBottom: "bottom",
  leftOrRight: "right",
};

const backUpInfo = localStorage.getItem("photoInfoProps");

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

export default class MovieStyle extends Component {
  initTop = 0;
  canvas: any = React.createRef();
  photo = photoProps;
  DraggerProps = hook(this).DraggerProps;
  drawImage = hook(this).drawImage;
  changeInfo = hook(this).changeInfo;
  save = hook(this).save;
  state = {
    isLoad: false,
    photoInfo: backUpInfo ? JSON.parse(backUpInfo) : photoInfoProps,
    mobileMode: document.documentElement.clientWidth <= 1080,
  };

  colorPicker = (value: string) => (
    <input
      className="colorPicker"
      type="color"
      value={this.state.photoInfo[value]}
      onChange={(e: any) => this.changeInfo(value, e.target.value)}
    />
  );

  createModule = (list: any) => {
    if (this.state.mobileMode) {
      return (
        <Tabs
          defaultActiveKey="0"
          animated={false}
          size="small"
          tabBarStyle={{ padding: "0 30px" }}
          tabBarGutter={30}
        >
          {list.map(
            (item: any, i: string) =>
              !item.notMobile && (
                <TabPane tab={item.title} key={i}>
                  <div className="ItemModule">
                    {item.child.map((child: any, i: number) => (
                      <div key={i}>{child}</div>
                    ))}
                  </div>
                </TabPane>
              )
          )}
        </Tabs>
      );
    } else {
      return list.map((item: any) => (
        <div className="ItemModule" key={item.title}>
          <div className="ModuleTitle">{item.title}</div>
          {item.child.map((child: any, i: number) => (
            <div key={i}>{child}</div>
          ))}
        </div>
      ));
    }
  };

  componentDidMount() {
    window.onresize = () => {
      const checkMode = document.documentElement.clientWidth <= 1080;
      this.setState({ mobileMode: checkMode });
    };
  }

  timer: any = null;

  render() {
    const { DraggerProps, photo, changeInfo, save, colorPicker } = this;
    let { canvas, timer } = this;
    const { isLoad, mobileMode, photoInfo } = this.state;
    const moduleList = [
      {
        notMobile: true,
        title: "基本信息",
        child: [
          <>
            宽度{margin}
            {photo.height}
          </>,
          <>
            高度{margin}
            {photo.width}
            {margin}->{margin}
            {photo.height + photoInfo.top + photoInfo.bottom}
          </>,
          <>
            平均色值{margin}
            <span className="color" style={{ borderColor: photo.color }}>
              {photo.color}
            </span>
          </>,
        ],
      },
      {
        title: "遮罩",
        child: [
          <>
            颜色{margin}
            {colorPicker("color")}
          </>,
          <>
            上边距{margin}
            <InputNumber
              value={photoInfo.top}
              size="small"
              min={0}
              onChange={(value = 0) => changeInfo("top", value)}
              defaultValue={photoInfo.top}
            />
          </>,
          <>
            下边距{margin}
            <InputNumber
              value={photoInfo.bottom}
              size="small"
              min={0}
              onChange={(value = 0) => changeInfo("bottom", value)}
              defaultValue={photoInfo.bottom}
            />
          </>,
        ],
      },
      {
        title: "文字",
        child: [
          <Input
            className="InputContext"
            size="small"
            placeholder="你好？少侠！"
            onChange={(e) => changeInfo("context", e.target.value)}
            value={photoInfo.context}
          />,
          <>
            颜色{margin}
            {colorPicker("fontColor")}
          </>,
          <>
            边距{margin}
            <InputNumber
              min={0}
              size="small"
              value={photoInfo.padding}
              onChange={(val = 0) => changeInfo("padding", val)}
            />
          </>,
          <>
            大小{margin}
            <InputNumber
              min={0}
              size="small"
              value={photoInfo.fontSize}
              onChange={(val = 0) => changeInfo("fontSize", val)}
            />
          </>,
        ],
      },
      {
        title: "位置",
        child: [
          <>
            {TextSwitch.map((item) => (
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
            ))}
          </>,
          <Checkbox
            checked={photoInfo.textCenter}
            onChange={(e) => changeInfo("textCenter", e.target.checked)}
          >
            中央显示
          </Checkbox>,
        ],
      },
      {
        title: "蒙板",
        child: [
          <>
            颜色{margin}
            {colorPicker("maskColor")}
          </>,
          <>
            透明度{margin}
            <div style={{ paddingLeft: "10px" }}>
              <Slider
                value={photoInfo.maskOpacity}
                onChange={(value: any) => changeInfo("maskOpacity", value)}
              />
            </div>
          </>,
        ],
      },
    ];

    const footerBtns = (
      <div className="footerBtns">
        <div className="save" onClick={save}>
          保存
        </div>
        <span className="replitImg">
          <Upload {...DraggerProps}>更换图像</Upload>
        </span>
      </div>
    );

    return (
      <div className="MovieStyle">
        {mobileMode && footerBtns}
        <div className={`Content  ${isLoad && "LoadContent"}`}>
          <div className="canvasBox">
            <img
              alt=""
              src="null"
              onTouchStart={(e: any) => {
                const img = e.target;
                timer = setTimeout(
                  () => (img.src = this.canvas.current.toDataURL("image/png")),
                  500
                );
              }}
              onContextMenu={(e: any) => {
                e.target.src = this.canvas.current.toDataURL("image/png");
              }}
              onTouchEnd={() => clearTimeout(timer)}
              hidden={!isLoad}
            />
            <canvas ref={canvas} id="canvas" hidden={!isLoad}></canvas>
          </div>
          {!isLoad && (
            <Dragger {...DraggerProps}>
              <span className="Upload">选择图像</span>
            </Dragger>
          )}
        </div>
        <div className={`RightBar ${isLoad && "LoadRight"}`}>
          <div className="Title">工作台</div>
          <div className={`RightBarContent ${!isLoad && "disabled"}`}>
            {this.createModule(moduleList)}
            <div hidden={mobileMode} className="ItemModule">
              {footerBtns}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
