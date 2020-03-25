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
export const changeSysConfig = (data: any) => {
  sysConfig.set(() => ({ ...data }), "changeSysConfig");
};

export default { changeSysConfig, changeUserData };
