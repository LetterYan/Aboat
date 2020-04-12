export { default as Init } from "./init";
export { default as ColorUtils } from "./color";

/**
 * 深拷贝
 */
export const deepClone = (obj: any) => {
  let t = obj ? new obj.constructor() : null;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object") return obj;
  for (let key in obj) {
    t[key] = deepClone(obj[key]);
  }
  return t;
};
