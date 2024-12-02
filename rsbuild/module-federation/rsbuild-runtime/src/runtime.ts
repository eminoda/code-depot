import { createRemoteComponent } from "@module-federation/bridge-react";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

// import React from "react";
// import ReactDOM from "react-dom";
// import axios from "axios";
// import * as amis from "amis";

import { FallbackErrorComp, FallbackComp } from "./support";

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
    shared?: {
      [key: string]: {
        version?: string;
        requiredVersion?: string;
        lib?: () => void;
      };
    };
  }) {
    this.el = el;
    init({ name: "runtime", remotes, shared });
  }

  // loadRemote(remoteModule: string, json: any) {
  //   const asyncComponent = lazy(
  //     () =>
  //       new Promise((resolve) => {
  //         //@ts-ignore
  //         loadRemote(remoteModule).then((module) => {
  //           resolve({
  //             //@ts-ignore
  //             default: module,
  //           });
  //         });
  //       })
  //   );

  //   const root = createRoot(document.querySelector(this.el)!);
  //   root.render(createElement(asyncComponent, json));
  // }

  // loadRemote(remoteModule: string) {
  //   return new Promise((resolve) => {
  //     loadRemote<{ default: any } | Record<string, any>>(remoteModule).then((module) => {
  //       if (module) {
  //         if (module.default) {
  //           resolve(module);
  //           return;
  //         } else {
  //           resolve({ default: module });
  //         }
  //       }
  //       throw new Error(`module not found: ${remoteModule}`);
  //     });
  //   });
  // }

  // loadComponent(moduleLoader: any, name: string) {
  //   return lazy(
  //     () =>
  //       new Promise((resolve) => {
  //         moduleLoader.then((module: { [x: string]: { default: never } | PromiseLike<{ default: never }> }) => {
  //           // @ts-ignore
  //           resolve({ default: module.default[name] });
  //         });
  //       })
  //   );
  // }

  loadComponent<T>(component: string) {
    return createRemoteComponent({
      loader: () => loadRemote(component),
      fallback: FallbackErrorComp,
      loading: FallbackComp,
    }) as unknown as T;
  }
}

export default Runtime;
