declare const _default: () => {
    render(info: import("@module-federation/bridge-react").RenderFnParams & {
        [key: string]: unknown;
    }): Promise<void>;
    destroy(info: {
        moduleName: string;
        dom: HTMLElement;
    }): Promise<void>;
    rawComponent: import("react").ComponentType<import("../demo/Input.tsx").InputProps>;
    __BRIDGE_FN__: (_args: import("../demo/Input.tsx").InputProps) => void;
};
export default _default;
