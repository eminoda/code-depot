declare class Runtime {
    constructor(options: RuntimeOptions);
    loadRemoteComponent(componentName: string): import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions, {}, any>;
}
export default Runtime;
