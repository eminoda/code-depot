<template>
  <div id="app">
    <!-- <ReactWebpackRemote />
    <Vue2WebpackRemote /> -->
    <Vue3ViteRemote />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    // HelloWorld,
    // ReactWebpackRemote: () => import("@/components/ReactWebpackRemote"),
    // Vue2WebpackRemote: () => import("Vue2WebpackRemote/App"),
    // Vue2WebpackRemote,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
