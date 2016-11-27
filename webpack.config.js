var webpack = require('webpack');

module.exports = {
  entry: ['./assets/js/app.jsx'],
  output: {
    path: '.',
    filename: 'public/app.js'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]"} ,
      { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.js$/, loader: "babel-loader", exclude: '/node_modules/' },
      { test: /\.jsx$/, loaders: ['jsx-loader', "babel-loader"] }
    ]
  }
};
