import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { h } from "vue";
import { defineAsyncComponent, defineComponent } from "vue";

// import { applyPureReactInVue } from "veaury";
// import Button from "./Button.tsx";

class Runtime {
  constructor(options: RuntimeOptions) {
    init(options);
  }
  loadRemoteComponent(componentName: string, isVueInReact?: boolean) {
    const remoteComponent = defineAsyncComponent({
      // suspensible: false,
      // @ts-ignore
      loader: () => loadRemote(componentName),
      // new Promise(async (resolve) => {
      //   setTimeout(() => {
      //     console.log("rendering");
      //     // @ts-ignore
      //     resolve(h("span", {}, "123"));
      //   }, 2000);
      // }),
      loadingComponent: () => h("div", {}, "Loading..."),
      errorComponent: () => h("div", {}, "Error..."),
      onError: (error: Error, retry: () => void, fail: () => void, attempts: number) => {
        console.log(error, retry, fail, attempts);
      },
      delay: 0,
    });
    return isVueInReact
      ? () =>
          Promise.resolve({
            default: defineComponent({
              setup(props, { attrs }) {
                console.log(props, attrs);
                return () => h(remoteComponent, attrs);
              },
            }),
          })
      : remoteComponent;
  }
}
export default Runtime;
