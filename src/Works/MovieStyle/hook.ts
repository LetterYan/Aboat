import { message } from "antd";
import { colorfulImg, browser } from "noahsark";

export default function (_this: any) {
  const DraggerProps = {
    name: "photo",
    multiple: false,
    showUploadList: false,
    beforeUpload: (file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        file.thumbUrl = e.target.result;
        message.success("加载完成，此操作不会上传任何文件");
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

    const text = ctx.measureText(photoInfo.context);
    let positionTrB: number = 0;
    let positionLrR: number = 0;
    if (!photoInfo.textCenter) {
      // 非正中央显示
      positionTrB =
        photoInfo.topOrBottom === "top"
          ? photoInfo.top / 2
          : cav.height - photoInfo.bottom / 2;

      switch (photoInfo.leftOrRight) {
        case "left":
          positionLrR = photoInfo.padding;
          break;
        case "right":
          positionLrR = cav.width - photoInfo.padding - text.width;
          break;
        case "center":
          positionLrR = cav.width / 2 - text.width / 2;
          break;
      }
    } else {
      // 正中央显示
      positionTrB = cav.height / 2;
      positionLrR = cav.width / 2 - text.width / 2;
    }

    ctx.fillText(
      photoInfo.context,
      positionLrR,
      positionTrB - photoInfo.fontSize / 2
    );
  };

  let time = true;
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
      localStorage.setItem("photoInfoProps", JSON.stringify(photoInfo));
      _this.setState({ photoInfo });
      requestAnimationFrame(_this.drawImage);
      setTimeout(() => (time = true), 50);
    }
  };

  /**
   * 废弃的拖动元素
   */
  // const moveRightBar = (e: any): void => {
  //   let { initTop, RightBar, RightBarTitle } = _this;
  //   if (initTop === 0) initTop = RightBar.current.offsetTop;
  //   const maxMoveSize = window.innerHeight - RightBar.current.offsetHeight;
  //   let top = e.touches[0].clientY - RightBarTitle.current.offsetHeight / 2;
  //   if (top > maxMoveSize && top < window.innerHeight * 0.7 + 50) {
  //     top = top - initTop;
  //     RightBar.current.style.transform = `translate3d(0, ${top}px, 0px)`;
  //   }
  // };

  /**
   * 保存图片
   */
  const save = () => {
    // 移动端提示长按保存图片
    if (browser.mobile) {
      message.success("请长按图片进行保存");
    } else {
      var aLink = document.createElement("a");
      aLink.download = String(new Date().getTime());
      aLink.href = _this.canvas.current.toDataURL("image/png");
      aLink.click();
    }
  };
  return { DraggerProps, drawImage, changeInfo, save };
}
