import { init, loadRemote } from "@module-federation/enhanced/runtime";
import React, { createElement, lazy, ReactElement } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { createRoot } from "react-dom/client";

class Runtime {
  private el: string;
  constructor({
    el,
    remotes,
  }: {
    el: string;
    remotes: {
      name: string;
      entry: string;
    }[];
  }) {
    this.el = el;
    const shared = {
      axios: {
        version: "1.7.8",
        scope: "default",
        lib: () => axios,
        shareConfig: {
          singleton: true,
          requiredVersion: "^1.7.8",
        },
      },
      react: {
        version: "18.3.1",
        scope: "default",
        lib: () => React,
        shareConfig: {
          singleton: true,
          requiredVersion: "^18.3.1",
        },
      },
      "react-dom": {
        version: "18.3.1",
        scope: "default",
        lib: () => ReactDOM,
        shareConfig: {
          singleton: true,
          requiredVersion: "^18.3.1",
        },
      },
    };
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

  loadRemote(remoteModule: string) {
    return new Promise((resolve) => {
      loadRemote<{ default: any } | Record<string, any>>(remoteModule).then((module) => {
        if (module) {
          if (module.default) {
            resolve(module);
            return;
          } else {
            resolve({ default: module });
          }
        }
        throw new Error(`module not found: ${remoteModule}`);
      });
    });
  }

  loadComponent(moduleLoader: any, name: string) {
    return lazy(
      () =>
        new Promise((resolve) => {
          moduleLoader.then((module: { [x: string]: { default: never } | PromiseLike<{ default: never }> }) => {
            // @ts-ignore
            resolve({ default: module.default[name] });
          });
        })
    );
  }
}

export default Runtime;
