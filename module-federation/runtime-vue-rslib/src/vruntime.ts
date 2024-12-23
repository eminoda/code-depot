import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { h } from "vue";
import { applyPureReactInVue } from "veaury";
import Button from "./Button.tsx";

class Runtime {
  constructor(options: RuntimeOptions) {
    init(options);
  }
  loadRemoteComponent(componentName: string) {
    console.log(componentName);
    return {
      // @ts-ignore
      loader: async () => {
        // const mod = await loadRemote(componentName);
        const mod = {
          default: applyPureReactInVue(Button),
        };
        console.log(mod);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return mod;
      },
      loadingComponent: () => h("div", {}, "Loading..."),
      delay: 100,
    };
    // return () => import("./Button.vue")
  }
}
export default Runtime;
