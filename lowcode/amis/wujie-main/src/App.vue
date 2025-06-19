<template>
  <div id="app">
    <!-- <h1>我是主项目</h1> -->
    <div id="wujie-container"></div>
  </div>
</template>

<script>
import { startApp } from "wujie";

export default {
  name: "App",
  mounted() {
    console.log(123)
    startApp({
      name: "wujie-amis",
      // url: "http://localhost:8081",
      url: "http://127.0.0.1:8888/examples/crud/table?orderBy=id&orderDir=asc&page=1",
      el: document.getElementById("wujie-container"),
      // 为所有资源请求（包括CSS）设置请求头
      // plugins: {
      //   cssLoader: (code, url, base) => {
      //     console.log(code, url,base)
      //     return url
      //   }
      // },
      fetch: (url) => {
        console.log(url)
        if (url.indexOf('.css')) {
          return fetch(url, {
            headers: {
              'Accept': 'text/css,*/*;q=0.1'
          }})
        }
        return fetch(url)
      }
    });
  },
};
</script>

<style></style>
