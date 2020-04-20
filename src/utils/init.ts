import { message, notification } from "antd";

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
};
