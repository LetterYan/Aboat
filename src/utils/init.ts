import { message, notification } from "antd";
const AV = require("leancloud-storage/live-query");

export const init = () => {
  message.config({
    top: 55,
    duration: 3,
    maxCount: 3,
  });

  notification.config({
    placement: "topRight",
    top: 55,
    duration: 5,
  });

  notification.open({
    message: "你好，少侠",
    description: "Welcome to A boat.",
  });

  AV.init({
    appId: "D9hySRdRLQH9RKfpSnl3WnfS-MdYXbMMI",
    appKey: "UaxrXf14KUFHl9CiWyXL88D2",
    serverURLs: "https//aboat.cc",
  });
};
