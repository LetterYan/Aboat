import { sysConfig, useStore, changeSysConfig } from "../stores";
import { message, notification } from "antd";

const Anime = () => {
  message.config({
    duration: 2,
    maxCount: 3
  });

  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 3
  });

  notification.open({
    message: "Hello World",
    description: "Welcome to A boat."
  });
};

export default Anime;
