// export { Button } from './Button';

import { init, loadRemote } from "@module-federation/enhanced/runtime";

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
}

export default Runtime;
