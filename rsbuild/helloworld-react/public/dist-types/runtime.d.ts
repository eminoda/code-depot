declare class Runtime {
    el: string;
    constructor({ el, remotes, shared, }: {
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
    });
    loadComponent<T>(component: string): T;
}
export default Runtime;
