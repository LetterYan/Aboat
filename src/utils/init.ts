import { message, notification } from "antd";
const AV = require("leancloud-storage/live-query");

export const init = () => {
  message.config({
    duration: 2,
    maxCount: 3,
  });

  notification.config({
    placement: "topRight",
    bottom: 50,
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
