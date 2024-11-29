import { lazy, useEffect } from "react";
import { createApp } from "vue";
import { loadRemote } from "@module-federation/enhanced/runtime";

const LoadVueComponent = () => {
  useEffect(() => {
    // @ts-ignore
    const RemoteTwoApp = lazy(() => loadRemote("remote_two/App"));
    createApp(RemoteTwoApp).mount("#vueRef");
  });
  return <div id="vueRef"></div>;
};
export default LoadVueComponent;
