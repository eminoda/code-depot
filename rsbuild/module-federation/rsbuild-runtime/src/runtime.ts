import { init, loadRemote } from "@module-federation/enhanced/runtime";
import React, { createElement, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
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

  loadRemote(remoteModule: string, name: string, json: any) {
    const asyncComponent = lazy(
      () =>
        new Promise((resolve, reject) => {
          //@ts-ignore
          loadRemote(remoteModule).then((module) => {
            resolve({
              //@ts-ignore
              default: module[name],
            });
          });
        })
    );

    const root = createRoot(document.querySelector(this.el)!);
    root.render(createElement(asyncComponent, json));
  }
}

export default Runtime;
