"use strict";

const ImageminPlugin = require("imagemin-webpack-plugin").default;

module.exports = {
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== "production", // 开发时不启用
      pngquant: {
        //图片质量
        quality: "90-100",
      },
    }),
  ],
};
