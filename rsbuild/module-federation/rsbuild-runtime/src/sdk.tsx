import { createRemoteComponent } from "@module-federation/bridge-react";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

// import { FallbackErrorComp, FallbackComp } from "./support.tsx";

class Runtime {
  public el: string;
  constructor({
    el,
    remotes,
    shared,
  }: {
    el: string;
    remotes: {
      name: string;
      entry: string;
    }[];
    shared: any;
  }) {
    this.el = el;
    console.log("runtime init");
    // init({
    //   remotes,
    //   shared,
    // });
  }
  init(options) {
    console.log("init");
    return init(options);
  }
  createRemoteComponent(options) {
    console.log("createRemoteComponent");
    return createRemoteComponent(options);
  }
  loadRemote(options) {
    return loadRemote(options);
  }
  lazyLoadRemote(component: string) {
    return new Promise((resolve) => {
      loadRemote(component).then((module) => {
        // @ts-ignore
        resolve(module);
      });
    });
  }

  // loadComponent<T>(component: string) {
  //   return createRemoteComponent({
  //     loader: () => loadRemote(component),
  //     fallback: FallbackErrorComp,
  //     loading: FallbackComp,
  //   }) as unknown as T;
  // }
}

export default Runtime;
