import { message } from "antd";
import { colorfulImg, browser } from "noahsark";
import { emojiBefor, emojisSet } from "utils";

export default function (_this: any) {
  const DraggerProps = {
    name: "photo",
    accept: "image/*",
    multiple: false,
    showUploadList: false,
    onChange: () => {
      message.loading({ content: "Loading...", key: "loading" });
    },
    beforeUpload: (file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        file.thumbUrl = e.target.result;
        const img = new Image();
        img.src = file.thumbUrl;
        img.onload = async (imgEvent: any) => {
          const color = await colorfulImg(img.src);
          _this.photo = {
            width: imgEvent.path[0].width,
            height: imgEvent.path[0].height,
            src: imgEvent.path[0].src,
            color,
            img,
          };
          _this.drawImage();
          setTimeout(() => {
            message.success({
              duration: 3,
              content: "加载成功！此操作不会上传任何文件",
              key: "loading",
            });
          }, 500);
          _this.setState({ isLoad: true });
        };
      };
      return false;
    },
  };

  /**
   * 绘制图片
   * @param img 图片dom
   * @param imgInfo 修改参数
   */
  const drawImage = () => {
    const { photo } = _this;
    const { photoInfo } = _this.state;
    const cav = _this.canvas.current;
    // 初次加载state
    cav.width = photo.width;
    cav.height = photo.height + (photoInfo.bottom + photoInfo.top);
    const ctx: any = cav.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(photo.img, 0, photoInfo.top);
    ctx.fillStyle = photoInfo.color;

    // 上边框
    ctx.fillRect(0, 0, cav.width, photoInfo.top);
    // 下边框
    ctx.fillRect(0, cav.height - photoInfo.bottom, cav.width, photoInfo.bottom);

    // 处理滑动条
    let opacity = photoInfo.maskOpacity;
    if (String(opacity).length === 1) opacity = "0" + opacity;
    if (photoInfo.maskOpacity === 100) opacity = "";
    // 遮罩蒙板
    ctx.fillStyle = photoInfo.maskColor + opacity;
    ctx.fillRect(0, 0, cav.width, cav.height);

    // 文字
    ctx.fillStyle = photoInfo.fontColor;
    ctx.font = `${photoInfo.fontSize}px Arial`;
    ctx.textBaseline = "top";

    let str = photoInfo.context; // 文字
    let textWidth: number = 0; // 文字长度 用于给emoji空出位置
    const reg = new RegExp(/\[([^[\]]*)\]/g); // 匹配 []
    const arr = str.match(reg); // 取出 []
    const num = Math.random(); // 用一个随机数用于间隔 emoji  ---ps: 秒啊！

    /**
     * 显示方位
     */
    const positionContent = (width: number = 0, preWidth: number = 0) => {
      let positionLrR: number = 0; // 左右
      let positionTrB: number = 0; // 上下
      const { photoInfo } = _this.state;
      // 非正中央显示
      if (!photoInfo.textCenter) {
        // 上下位置
        if (photoInfo.topOrBottom === "top") {
          positionTrB = photoInfo.top / 2 - photoInfo.fontSize / 2;
        } else {
          positionTrB =
            cav.height - photoInfo.bottom / 2 - photoInfo.fontSize / 2 + 10;
        }
        // 左右位置
        switch (photoInfo.leftOrRight) {
          case "left":
            positionLrR += photoInfo.padding + width;
            break;
          case "right":
            positionLrR += width + (cav.width - preWidth) - photoInfo.padding;
            break;
          case "center":
            positionLrR = cav.width / 2 - (preWidth / 2 - width);
            break;
        }
      } else {
        // 正中央显示
        positionTrB = cav.height / 2 - photoInfo.fontSize / 2;
        positionLrR = cav.width / 2 - (preWidth / 2 - width);
      }
      return { positionLrR, positionTrB };
    };

    // 处理字符串
    if (arr)
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item.match(emojiBefor)) {
          const newStr = item.split(reg).join("");
          str = str.replace(item, `${num}${newStr}${num}`);
        }
      }

    const textList = str.split(num);
    const fixSize = 20; // 修正emoji的高低大小

    let preWidth: number = 0;
    if (/center|right/.test(photoInfo.leftOrRight) || photoInfo.textCenter) {
      for (let i = 0; i < textList.length; i++) {
        const item = textList[i];
        if (item) {
          if (item.match(emojiBefor) && emojisSet[item]) {
            preWidth += photoInfo.fontSize + fixSize;
          } else {
            const text = ctx.measureText(item, "text");
            preWidth += text.width;
          }
        }
      }
    }

    for (let i = 0; i < textList.length; i++) {
      const item = textList[i];
      if (item) {
        if (item.match(emojiBefor) && emojisSet[item]) {
          const emojie = emojisSet[item];
          emojie.width = photoInfo.fontSize + "px";
          const fontSize = photoInfo.fontSize + fixSize;
          const { positionLrR, positionTrB } = positionContent(
            textWidth,
            preWidth
          );
          ctx.drawImage(
            emojie,
            positionLrR,
            positionTrB - fixSize,
            fontSize,
            fontSize
          );
          textWidth += fontSize;
        } else {
          const text = ctx.measureText(item, "text");
          const { positionLrR, positionTrB } = positionContent(
            textWidth,
            preWidth
          );
          ctx.fillText(item, positionLrR, positionTrB);
          textWidth += text.width;
        }
      }
    }
  };

  let time: boolean = true;
  /**
   * 修改图片信息
   */
  const changeInfo = (type: string, value: number | string | boolean) => {
    if (time) {
      time = false;
      if (
        /top|bottom|padding|fontSize/.test(type) &&
        (value === "" || value === null)
      ) {
        value = 0;
      }
      const photoInfo = _this.state.photoInfo;
      photoInfo[type] = value;
      _this.setState({ photoInfo });
      requestAnimationFrame(_this.drawImage);
      localStorage.setItem("photoInfoProps", JSON.stringify(photoInfo));
      // 时间高于10会出现打字输入被间断
      setTimeout(() => (time = true), 10);
    }
  };

  /**
   * 保存图片
   */
  const save = () => {
    message.loading({ content: "下载中...", key: "download" });
    // 移动端提示长按保存图片
    if (browser.mobile) {
      message.success({ content: "请长按图片进行保存", key: "download" });
    } else {
      var aLink = document.createElement("a");
      aLink.download = String(new Date().getTime());
      aLink.href = _this.canvas.current.toDataURL("image/png");
      aLink.click();
      message.success({ content: "下载成功", key: "download" });
    }
  };
  return { DraggerProps, drawImage, changeInfo, save };
}
