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
      '/mock-api': {
        target: 'https://aisuda.bce.baidu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock-api/, '')
      },
      '/uc': {
        target: 'https://mapi.uat.sheca.com',
        changeOrigin: true,
      },
      '/s4': {
        target: 'https://s4.sheca.com',
        changeOrigin: true,
        pathRewrite: {
          ["^/s4"]: "",
        },
      },
    }
  }
})
