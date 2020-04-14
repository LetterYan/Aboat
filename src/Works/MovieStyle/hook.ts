import { useState, useEffect, useRef } from "react";
import { notification, message } from "antd";
import { deepClone, browser, colorfulImg } from "noahsark";

const photoProps = {
  width: 0,
  height: 0,
  src: 0,
  color: "rgb(0, 0, 0)",
  img: new Image(),
  imgSrc: "",
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

const downloadFile = (content: any) => {
  var aLink = document.createElement("a");
  aLink.download = String(new Date().getTime());
  aLink.href = content;
  aLink.click();
};

const canvas = document.createElement("canvas");
const backUpInfo = localStorage.getItem("photoInfoProps");

// let imgSrc = "";

export default function useMovieStyle() {
  const imgDom: any = useRef(null);
  const [isLoad, setIsLoad] = useState(false);
  const [photo, setPhoto] = useState(photoProps);
  const [photoInfo, setPhotoInfo]: any = useState(
    backUpInfo ? JSON.parse(backUpInfo) : photoInfoProps
  );

  useEffect(() => {
    setIsLoad(!!photo.src);
  }, [photo]);

  useEffect(() => {
    drawImage();
    localStorage.setItem("photoInfoProps", JSON.stringify(photoInfo));
  }, [photoInfo]);

  /**
   * 绘制图片
   * @param img 图片dom
   * @param imgInfo 修改参数
   */
  const drawImage = () => {
    const cav = canvas;
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

    const result = {
      width: photo.width,
      height: photo.height,
      src: photo.src,
      color: photo.color,
      img: photo.img,
      imgSrc: cav.toDataURL("image/jpeg"),
    };
    imgDom.current.src = result.imgSrc;
    setPhoto(result);
  };

  /**
   * 修改图片信息
   */
  const changeInfo = (type: string, value: number | string | boolean) => {
    if (
      /top|bottom|padding|fontSize/.test(type) &&
      (value === "" || value === null)
    ) {
      value = 0;
    }
    photoInfo[type] = value;
    setPhotoInfo(deepClone(photoInfo));
  };

  /**
   * 保存图片
   */
  const save = () => {
    // 移动端提示长按保存图片
    if (browser.mobile) {
      message.success("请长按图片进行保存");
    } else {
      downloadFile(photo.imgSrc);
    }
  };

  const DraggerProps = {
    name: "photo",
    multiple: false,
    showUploadList: false,
    beforeUpload: (file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        file.thumbUrl = e.target.result;
        notification.success({
          message: "图像选择成功",
          description:
            "本操作完全不会上传任何文件，图像仅存在本地，不会上传服务器",
        });
        const img = new Image();
        img.src = file.thumbUrl;
        img.onload = async (imgEvent: any) => {
          const color = await colorfulImg(img.src);
          setPhoto({
            width: imgEvent.path[0].width,
            height: imgEvent.path[0].height,
            src: imgEvent.path[0].src,
            color,
            img,
            imgSrc: "",
          });
          changeInfo("color", photoInfo.color);
        };
      };
      return false;
    },
  };

  return {
    photo,
    photoInfo,
    DraggerProps,
    isLoad,
    changeInfo,
    save,
    imgDom,
    canvas,
  };
}
