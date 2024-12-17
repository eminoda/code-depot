import React from "react";
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
declare class Runtime {
    constructor(options: Options);
    loadRemote(component: string): Promise<unknown>;
    createRemoteComponent(info: {
        loader: () => Promise<unknown>;
        loading: ReactNode;
        fallback: ComponentType<{
            error: any;
            resetErrorBoundary: (...args: any[]) => void;
        }>;
        export?: undefined;
    }): React.ForwardRefExoticComponent<never>;
    createRemoteComponent2(name: string): React.ForwardRefExoticComponent<never>;
}
export default Runtime;
