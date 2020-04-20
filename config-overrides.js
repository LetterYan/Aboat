const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");
process.env.GENERATE_SOURCEMAP = "false";

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    noIeCompat: true,
    localIdentName: "[local]--[hash:base64:5]",
    modifyVars: { "@primary-color": "#505050" },
  }),
  addWebpackAlias({
    utils: path.resolve(__dirname, "src/utils"),
    components: path.resolve(__dirname, "src/components"),
    static: path.resolve(__dirname, "src/static"),
    constant: path.resolve(__dirname, "src/constant"),
    noahsark: path.resolve(__dirname, "src/noahsark/src"),
  })
);
