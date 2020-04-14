import { useState, useEffect } from "react";
import { notification, message } from "antd";
import { deepClone, browser, colorfulImg, base64Img2Blob } from "noahsark";

const photoProps = {
  width: 0,
  height: 0,
  src: 0,
  color: "rgb(0, 0, 0)",
  img: new Image(),
  imgSrc: "",
};

const photoInfoProps = { top: 150, bottom: 150, color: "#ffffff" };

const downloadFile = (content: any) => {
  var aLink = document.createElement("a");
  var blob = base64Img2Blob(content);
  aLink.download = String(new Date().getTime());
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
};

export default function useMovieStyle(canvas: any) {
  const [isLoad, setIsLoad] = useState(false);
  const [photo, setPhoto] = useState(photoProps);
  const [photoInfo, setPhotoInfo]: any = useState(photoInfoProps);

  useEffect(() => {
    setIsLoad(!!photo.src);
  }, [photo]);

  useEffect(() => {
    drawImage();
  }, [photoInfo]);

  /**
   * 绘制图片
   * @param img 图片dom
   * @param imgInfo 修改参数
   */
  const drawImage = async (img?: any, imgInfo?: any) => {
    // 初次加载state
    const newPhoto = imgInfo || photo;
    img = img || photo.img;
    const color = await colorfulImg(img.src);
    canvas.width = newPhoto.width;
    canvas.height = newPhoto.height + (photoInfo.bottom + photoInfo.top);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, photoInfo.top);
    ctx.fillStyle = photoInfo.color;
    ctx.fillRect(0, 0, canvas.width, photoInfo.top);
    ctx.fillRect(
      0,
      canvas.height - photoInfo.bottom,
      canvas.width,
      photoInfo.bottom
    );

    setPhoto({
      width: newPhoto.width,
      height: newPhoto.height,
      src: img.src,
      color,
      img,
      imgSrc: canvas.toDataURL("image/png"),
    });
  };

  /**
   * 修改图片信息
   */
  const changeInfo = (type: string, value: number | string) => {
    const oldPhotoInfo = deepClone(photoInfo);
    oldPhotoInfo[type] = value;
    setPhotoInfo(oldPhotoInfo);
  };

  /**
   * 保存图片
   */
  const save = () => {
    // 移动端提示长按保存图片
    if (browser.mobile) {
      message.success("请长按图片进行保存");
    } else {
      downloadFile(canvas.toDataURL("image/jpg"));
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
          const imgInfo = {
            width: imgEvent.path[0].width,
            height: imgEvent.path[0].height,
            src: imgEvent.path[0].src,
            color,
            img,
            imgSrc: "",
          };
          console.log(imgInfo.height, imgInfo.width);

          setPhoto(imgInfo);
          drawImage(img, imgInfo);
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
  };
}
