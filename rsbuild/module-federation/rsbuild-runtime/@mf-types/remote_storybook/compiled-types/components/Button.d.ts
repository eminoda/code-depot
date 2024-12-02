declare const _default: () => {
    render(info: import("@module-federation/bridge-react").RenderFnParams & {
        [key: string]: unknown;
    }): Promise<void>;
    destroy(info: {
        moduleName: string;
        dom: HTMLElement;
    }): Promise<void>;
    rawComponent: import("react").ComponentType<import("../demo/Button").ButtonProps>;
    __BRIDGE_FN__: (_args: import("../demo/Button").ButtonProps) => void;
};
export default _default;
