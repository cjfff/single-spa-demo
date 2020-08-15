const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode = process.env.mode || "development";

module.exports = {
  mode,
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: "budle.js", // 打包后的文件名
    path: path.resolve(__dirname, "../dist"),
  },
  // 开发服务器配置
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    port: 4444,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "cjfff app",
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
      inject: true,
      hash: true,
    }),
  ],
};
