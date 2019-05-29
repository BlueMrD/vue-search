module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://sug.so.360.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }
}
