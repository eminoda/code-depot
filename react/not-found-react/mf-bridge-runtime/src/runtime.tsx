// import { createRemoteComponent } from "@module-federation/bridge-react";
// import { init, loadRemote } from "@module-federation/enhanced/runtime";
// import { FallbackErrorComp, FallbackComp } from "./support.tsx";
// Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

import React from "react";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { createRemoteComponent } from "@module-federation/bridge-react";

const FallbackErrorComp = (info: any) => {
  return (
    <div>
      <h2>This is ErrorBoundary Component</h2>
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{info?.error.message}</pre>
      <button onClick={() => info.resetErrorBoundary()}>resetErrorBoundary(try again)</button>
    </div>
  );
};
const FallbackComp = <div data-test-id="loading">loading...</div>;

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

  createRemoteComponent<T>(component: string) {
    return createRemoteComponent({
      loader: () => loadRemote(component),
      fallback: FallbackErrorComp,
      loading: FallbackComp,
    }) as unknown as T;
  }
  loadRemote(component: string) {
    return loadRemote(component);
  }
}

export default Runtime;
