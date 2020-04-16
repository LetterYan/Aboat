import React, { Component } from "react";
import {
  Upload,
  InputNumber,
  Radio,
  Input,
  Checkbox,
  Slider,
  Tabs,
  Popover,
  message,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { EmojiBox } from "components";
import { browser } from "noahsark";
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

const configDataProps = {
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

const backUpInfo = localStorage.getItem("configDataProps");

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
  photo = photoProps;
  initTop: number = 0;
  timer: any = null;
  imgDom: any = React.createRef();
  canvas: any = React.createRef();
  DraggerProps = hook(this).DraggerProps;
  drawImage = hook(this).drawImage;
  changeInfo = hook(this).changeInfo;
  save = hook(this).save;
  state = {
    lastUpdate: false,
    isLoad: false,
    hiddenEmojiBox: false,
    configData: backUpInfo ? JSON.parse(backUpInfo) : configDataProps,
    mobileMode: document.documentElement.clientWidth <= 1080,
  };

  colorPicker = (value: string) => {
    return (
      <input
        className="colorPicker"
        type="color"
        value={this.state.configData[value]}
        onChange={(e: any) => this.changeInfo(value, e.target.value)}
      />
    );
  };

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
      return list.map((item: any, i: number) => (
        <div className="ItemModule" key={item.title}>
          <div className="ModuleTitle">{item.title}</div>
          {item.child.map((child: any, i: number) => (
            <div key={i}>{child}</div>
          ))}
        </div>
      ));
    }
  };

  clickEmoji = (emoji: any) => {
    const { changeInfo } = this;
    let { configData } = this.state;
    changeInfo("context", `${configData.context}[${emoji.name}]`);
    this.setState({ hiddenEmojiBox: false });
  };

  EmojiPopover = () => (
    <Popover
      trigger="click"
      arrowPointAtCenter
      visible={this.state.hiddenEmojiBox}
      placement={this.state.mobileMode ? "top" : "left"}
      onVisibleChange={(open: boolean) =>
        this.setState({ hiddenEmojiBox: open })
      }
      content={<EmojiBox callback={(reslut: any) => this.clickEmoji(reslut)} />}
    >
      <SmileOutlined />
    </Popover>
  );

  moduleList = () => {
    const { configData } = this.state;
    const { photo, colorPicker, changeInfo, EmojiPopover } = this;
    return [
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
            {photo.height + configData.top + configData.bottom}
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
            上边{margin}
            <InputNumber
              value={configData.top}
              size="small"
              min={0}
              onChange={(value = 0) => changeInfo("top", value)}
              defaultValue={configData.top}
            />
          </>,
          <>
            下边{margin}
            <InputNumber
              value={configData.bottom}
              size="small"
              min={0}
              onChange={(value = 0) => changeInfo("bottom", value)}
              defaultValue={configData.bottom}
            />
          </>,
        ],
      },
      {
        title: "文字",
        child: [
          <Input
            addonAfter={EmojiPopover()}
            className="InputContext"
            size="small"
            placeholder="你好？少侠！"
            onChange={(e) => changeInfo("context", e.target.value)}
            value={configData.context}
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
              value={configData.padding}
              onChange={(val = 0) => changeInfo("padding", val)}
            />
          </>,
          <>
            大小{margin}
            <InputNumber
              min={0}
              size="small"
              value={configData.fontSize}
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
                  disabled={configData.textCenter}
                  value={configData[item.type]}
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
            checked={configData.textCenter}
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
                value={configData.maskOpacity}
                onChange={(value: any) => changeInfo("maskOpacity", value)}
              />
            </div>
          </>,
        ],
      },
      {
        title: "Emoji 尚未开发",
        child: [<>颜色{margin} rgb(21, 21, 21)</>],
      },
    ];
  };

  componentDidMount() {
    window.onresize = () => {
      const checkMode = document.documentElement.clientWidth <= 1080;
      this.setState({ mobileMode: checkMode });
    };
  }

  render() {
    const { DraggerProps, save, moduleList } = this;
    let { canvas, timer, imgDom } = this;
    const { isLoad, mobileMode, lastUpdate } = this.state;

    const footerBtns = (
      <div className="footerBtns">
        <div className="save" onClick={save}>
          保存
        </div>
        <Upload className="replitImg" {...DraggerProps}>
          更换图像
        </Upload>
      </div>
    );

    return (
      <div className="MovieStyle">
        {mobileMode && footerBtns}
        <div className={`Content  ${isLoad && "LoadContent"}`}>
          <div hidden={!isLoad} className="canvasBox">
            <img
              alt=""
              src="null"
              ref={imgDom}
              onTouchStart={() => {
                timer = setTimeout(() => {
                  !lastUpdate &&
                    message.info("请先点击保存按钮生成无损图，然后长按下载");
                }, 500);
              }}
              onContextMenu={() =>
                !lastUpdate &&
                !browser.mobile &&
                message.info("请先点击保存按钮生成无损图，然后长按下载")
              }
              onTouchEnd={() => clearTimeout(timer)}
            />
            <canvas ref={canvas} id="canvas"></canvas>
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
            {this.createModule(moduleList())}
            <div hidden={mobileMode} className="ItemModule">
              {footerBtns}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
