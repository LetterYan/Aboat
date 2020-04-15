const routerList = [
  {
    path: "/Works/MovieStyle",
    name: "电影风格",
    title: "电影风格",
  },
];

/**
 * 便于查找emoji的列表
 */
const emojisSet: any = new Set([]);

/**
 * emoji列表
 */
const emojis = require
  .context("static/svg/emoji", false)
  .keys()
  .map((str) => {
    const image = new Image();
    const name = str.replace(/(.\/)|(.svg)/g, "");
    image.src = require(`static/svg/emoji/${str.replace(/(.\/)/g, "")}`);
    emojisSet[name] = image;
    return {
      name,
      path: image.src,
    };
  })
  .sort(
    (a, b) =>
      Number(a.name.replace(".c-", "")) - Number(b.name.replace(".c-", ""))
  )
  .reverse();

export { routerList, emojis, emojisSet };
