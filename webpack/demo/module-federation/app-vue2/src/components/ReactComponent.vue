<template>
  <div ref="rootRef"></div>
</template>

<script>
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import ComponentB from "ComponentB/App";
export default {
  name: "HomeView",
  async mounted() {
    const root = ReactDOM.createRoot(this.$refs.rootRef);
    root.render(React.createElement(ComponentB));
  },
};
</script>
