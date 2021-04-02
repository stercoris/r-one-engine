const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
module.exports = {
  entry: "./games/mario/main.ts",
  watch: true,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        baseUrl: "./src",
      }),
    ],
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
