/**
 * 获取图片平均色
 * @param imgUrl 图片地址
 */
const colorfulImg = (imgUrl: string): any => {
  let canvas = document.createElement("canvas"),
    imgEl = document.createElement("img"),
    context: any = canvas.getContext("2d"),
    defaultRGB = { r: 0, g: 0, b: 0 };
  imgEl.src = imgUrl;

  return new Promise((resolve) => {
    imgEl.onload = () => {
      imgEl.style.width = "300px";
      imgEl.style.height = "150px";
      canvas.width = 300;
      canvas.height = 150;
      if (!context) return defaultRGB;
      context.drawImage(imgEl, 0, 0);
      const res = CalculateColor(context);
      resolve(res);
    };
  });
};

const CalculateColor: any = (context: any) => {
  let blockSize = 5,
    length,
    data,
    count = 0,
    i = -4,
    defaultRGB = { r: 0, g: 0, b: 0 },
    rgb = { r: 0, g: 0, b: 0 };

  try {
    data = context.getImageData(0, 0, 10, 10);
  } catch (e) {
    return defaultRGB;
  }
  length = data.data.length;
  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
};

export default { colorfulImg, CalculateColor };
