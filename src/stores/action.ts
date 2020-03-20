import { userData, sysConfig } from "./store";

/**
 * 用户信息
 * @param data 内容
 */
export const changeUserData = (data: any) => {
  userData.set(() => ({ ...data }), "changeUserData");
};

/**
 * 全局配置
 * @param type 设置项
 * @param data 设置内容
 */
export const changeSysConfig = (type: string, data: any) => {
  const _class = type.split(".")[0];
  const _checked = type.split(".")[1];
  const newStore = sysConfig.get();
  newStore[_class][_checked] = data;
  sysConfig.set(() => ({ ...newStore }), "changeSysConfig");
};

export default { changeSysConfig, changeUserData };
