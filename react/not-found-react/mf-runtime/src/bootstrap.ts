// import { createRemoteComponent } from "@module-federation/bridge-react";
// import { init, loadRemote } from "@module-federation/enhanced/runtime";
// import { FallbackErrorComp, FallbackComp } from "./support.tsx";

import { init, loadRemote } from "@module-federation/enhanced/runtime";

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
    shared: {
      [pkgName: string]: {
        version: string;
        singleton: boolean;
        lib: () => void;
      };
    };
  }) {
    this.el = el;
    init({
      name: "runtime",
      remotes,
      shared,
    });
  }

  //   loadComponent<T>(component: string) {
  //     return createRemoteComponent({
  //       loader: () => loadRemote(component),
  //       fallback: FallbackErrorComp,
  //       loading: FallbackComp,
  //     }) as unknown as T;
  //   }
  loadRemote(component: string) {
    return loadRemote(component);
  }
}

export default Runtime;
