const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "totea-form.js",
    library: 'toteaForm',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
  },
  externals: {
    axios: 'axios'
  },
  module: {
    rules: [
      {
        // js
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      { test: /\.pug$/, loader: "pug-plain-loader" },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
