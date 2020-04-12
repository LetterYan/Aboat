import { useState, useEffect } from "react";
import { notification } from "antd";
import { ColorUtils, deepClone } from "utils";
const { colorfulImg, CalculateColor } = ColorUtils;

const photoProps = {
  width: 0,
  height: 0,
  src: 0,
  color: "rgb(0, 0, 0)",
  img: new Image(),
};

const photoInfoProps = { top: 150, bottom: 150, color: "#ffffff" };

function base64Img2Blob(code: any) {
  var parts = code.split(";base64,");
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

const downloadFile = (content: any) => {
  var aLink = document.createElement("a");
  var blob = base64Img2Blob(content);
  var evt = document.createEvent("MouseEvents");
  evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
  aLink.download = String(new Date().getTime());
  aLink.href = URL.createObjectURL(blob);
  aLink.dispatchEvent(evt);
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

  const drawImage = async (img?: any, imgInfo?: any) => {
    // 初次加载state
    const newPhoto = imgInfo || photo;
    img = img || photo.img;
    const color = await colorfulImg(img.src);
    canvas = canvas.current;
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
    });
  };

  const changeInfo = (type: string, value: number | string) => {
    const oldPhotoInfo = deepClone(photoInfo);
    oldPhotoInfo[type] = value;
    setPhotoInfo(oldPhotoInfo);
  };

  const save = () => {
    downloadFile(canvas.current.toDataURL("image/png"));
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
          };
          setPhoto(imgInfo);
          drawImage(img, imgInfo);
        };
      };
      return false;
    },
  };

  return { photo, photoInfo, DraggerProps, isLoad, changeInfo, save };
}
