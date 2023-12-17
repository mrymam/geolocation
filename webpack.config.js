module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: `${__dirname}/dist`,
    filename: "main.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: {
      directory: "./dist",
    },
  },
  mode: "development",
  module: {
    rules: [ { test: /\.jsx$/, loader: "babel-loader", exclude: /node_modules/ },],
  },
};
