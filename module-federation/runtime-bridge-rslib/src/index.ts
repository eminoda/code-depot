// export { Button } from './Button';

import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { createRemoteComponent } from "@module-federation/bridge-react";
import { ReactNode, ComponentType } from "react";

interface RemoteWithEntry {
  name: string;
  entry: string;
}

type Shared = {
  version: string;
  scope: Array<string>;
  useIn: Array<string>;
  from: string;
  deps: Array<string>;
  lib?: () => any;
  loaded?: boolean;
  loading?: null | Promise<any>;
  eager?: boolean;
};
interface Options {
  name: string;
  remotes: Array<RemoteWithEntry>;
  shared: {
    [pkgName: string]: Shared;
  };
}

class Runtime {
  constructor(options: Options) {
    init(options);
  }
  loadRemote(component: string) {
    return loadRemote(component);
  }
  createRemoteComponent(info: { loader: () => Promise<unknown>; loading: ReactNode; fallback: ComponentType<{ error: any; resetErrorBoundary: (...args: any[]) => void }>; export?: undefined }) {
    return createRemoteComponent(info);
  }
}

export default Runtime;
