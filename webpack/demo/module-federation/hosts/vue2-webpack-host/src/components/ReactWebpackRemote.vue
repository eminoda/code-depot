<template>
  <div>
    <div ref="remoteRef"></div>
  </div>
</template>

<script>
import React from "react";
import ReactDOM from "react-dom/client";
import ReactWebpackRemote from "ReactWebpackRemote/App";
export default {
  name: "ReactWebpackRemote",
  async mounted() {
    const root = ReactDOM.createRoot(this.$refs.remoteRef);
    const node = React.createElement(ReactWebpackRemote)
    console.log(node)
    root.render(node);
    // console.log(ReactWebpackRemote());
  },
};
</script>
