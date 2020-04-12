const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    localIdentName: "[local]--[hash:base64:5]",
    // modifyVars: { "@primary-color": "#900001" },
  })
);
