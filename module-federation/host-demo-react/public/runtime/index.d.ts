interface RemoteWithEntry {
    name: string;
    entry: string;
}
type Shared = {
    version: string;
    lib?: () => any;
};
interface Options {
    name: string;
    remotes: Array<RemoteWithEntry>;
    shared: {
        [pkgName: string]: Shared;
    };
}
declare class Runtime {
    constructor(options: Options);
    loadRemote(component: string): Promise<unknown>;
}
export default Runtime;
