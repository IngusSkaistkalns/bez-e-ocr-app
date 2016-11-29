var webpack = require('webpack');

module.exports = {
  entry: ['./assets/js/app.jsx', './assets/css/style.css'],
  output: {
    path: '.',
    filename: 'public/app.js'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]"} ,
      { test: /\.css$/, loader: "style-loader!css-loader?root=." },
      { test: /\.js$/, loader: "babel-loader", exclude: '/node_modules/' },
      { test: /\.jsx$/, loaders: ['jsx-loader', "babel-loader"] }
    ]
  }
};
