/**
 * 获取图片平均色
 * @param imgUrl 图片地址
 */
const colorfulImg = (imgUrl: string): any => {
  var blockSize = 5,
    canvas = document.createElement("canvas"),
    imgEl = document.createElement("img"),
    defaultRGB = { r: 0, g: 0, b: 0 },
    context: any = canvas.getContext("2d"),
    data,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0;
  imgEl.src = imgUrl;

  return new Promise((resolve) => {
    imgEl.onload = () => {
      imgEl.style.width = "300px";
      imgEl.style.height = "150px";
      canvas.width = 300;
      canvas.height = 150;

      if (!context) return defaultRGB;
      context.drawImage(imgEl, 0, 0);

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

      resolve(`rgb(${rgb.r},${rgb.g},${rgb.b})`);
    };
  });
};
export default { colorfulImg };
