import { message, notification } from "antd";

const useAnime = () => {
  message.config({
    duration: 2,
    maxCount: 3
  });

  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 5
  });

  notification.open({
    duration: null,
    message: "Hello World",
    description: "Welcome to A boat."
  });
};

export default useAnime;
