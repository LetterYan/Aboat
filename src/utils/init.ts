// // 存储服务
var AV = require("leancloud-storage/live-query");
// const { Query, User } = AV;
// 即时通讯服务
// const { Realtime, TextMessage } = require("leancloud-realtime");

export default function Init() {
  AV.init({
    appId: "D9hySRdRLQH9RKfpSnl3WnfS-MdYXbMMI",
    appKey: "UaxrXf14KUFHl9CiWyXL88D2",
    serverURLs: "https//aboat.cc"
  });
  console.log(AV);
}
