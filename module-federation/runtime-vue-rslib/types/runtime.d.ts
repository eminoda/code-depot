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
declare interface RuntimeOptions {
  name: string;
  remotes: Array<RemoteWithEntry>;
  shared: {
    [pkgName: string]: Shared;
  };
}
