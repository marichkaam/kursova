// webpack.config.js

module.exports = {
    // other webpack configurations...
    resolve: {
      fallback: {
        "zlib": require.resolve("browserify-zlib"),
        "querystring": require.resolve("querystring-es3"),
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "fs": false, // For fs, stream, and util, it's recommended to set them to false
        "stream": false,
        "util": false
      }
    }
  };
  