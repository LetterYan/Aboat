/**
 * 便于查找emoji的列表
 */
const emojisSet: any = new Set([]);
const emojiBefor = "emoji-";

/**
 * emoji列表
 */
const coolEmoji = require
  .context("static/svg/emoji", false)
  .keys()
  .map((str) => {
    const image: HTMLImageElement = new Image();
    const name: string = str.replace(/(.\/)|(.svg)/g, "");
    image.src = require(`static/svg/emoji/${str.replace(/(.\/)/g, "")}`);
    emojisSet[name] = image;
    return {
      name,
      path: image.src,
    };
  })
  .sort(
    (a, b) =>
      Number(a.name.replace(".emoji-", "")) -
      Number(b.name.replace(".emoji-", ""))
  )
  .reverse();

const icons = require
  .context("static/svg/icon", false)
  .keys()
  .map((str) => {
    const image: HTMLImageElement = new Image();
    const name: string = str.replace(/(.\/)|(.svg)/g, "");
    image.src = require(`static/svg/icon/${str.replace(/(.\/)/g, "")}`);
    emojisSet[name] = image;
    return {
      name,
      path: image.src,
    };
  });

const emojis: any[] = [
  { title: "emoji", icons: coolEmoji },
  { title: "icon", icons },
];

export { emojis, emojisSet, emojiBefor };
