const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const isProduction = env === "production";

  return {
    entry: "./src/app.js",
    output: {
      path: path.join(__dirname, "public"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          use: {
            loader: "babel-loader"
          },
          test: /\.js$/,
          exclude: "/node-modules/"
        },
        {
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: './public'
              }
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
              
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
              
            }
          ],
          test: /\.s?css$/
        }
      ]
    },
    plugins: [new MiniCssExtractPlugin({ filename: "styles.css", chunkFilename: "stoils.css" })],
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true
    }
  };
};
