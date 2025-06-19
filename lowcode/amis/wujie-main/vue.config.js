const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/packages": {
        target: 'http://127.0.0.1:8888',
        origin: true
      },
      "/examples": {
        target: 'http://127.0.0.1:8888',
        origin: true
      },
    }
  }
})
