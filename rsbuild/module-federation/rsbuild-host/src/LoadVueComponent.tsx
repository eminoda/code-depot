import { createApp } from "vue";
import RemoteTwo from "remote_two/App";
import React, { Suspense, useEffect } from "react";

const LoadVueComponent = () => {
  useEffect(() => {
    createApp(RemoteTwo).mount("#vueRef");
  }, []);
  return <div id="vueRef"></div>;
};
export default LoadVueComponent;
