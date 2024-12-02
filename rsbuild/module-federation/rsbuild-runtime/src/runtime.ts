import { createRemoteComponent } from "@module-federation/bridge-react";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

import React, { createElement, lazy, ReactElement } from "react";
import ReactDOM from "react-dom";

import axios from "axios";
import { FallbackErrorComp, FallbackComp } from "./support";

import * as reactHookForm from 'react-hook-form';

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
      // version < requireVersion
      // [ Federation Runtime ] Warn Version 1.6.8 from runtime of shared singleton module axios does not satisfy the requirement of runtime which needs ^1.7.8)
      axios: {
        version: "1.6.8",
        scope: "default",
        lib: () => axios,
      },
      /**
       * react singleon
       * [ Federation Runtime ] Warn Version 18.0.0 from runtime of shared singleton module react does not satisfy the requirement of remote_storybook which needs ^18.3.0)
       * react.development.js:209 Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
       * 1. You might have mismatching versions of React and the renderer (such as React DOM)
       * 2. You might be breaking the Rules of Hooks
       * 3. You might have more than one copy of React in the same app
       * See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
       */
      react: {
        version: "18.0.0",
        scope: "default",
        lib: () => React,
      },
      "react-dom": {
        version: "18.3.1",
        scope: "default",
        lib: () => ReactDOM,
      },
      "react-hook-form": {
        version: "7.53.2",
        scope: "default",
        lib: () => reactHookForm,
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
      loader: () => loadRemote<T>(component),
      fallback: FallbackErrorComp,
      loading: FallbackComp,
    });
  }
}

export default Runtime;
