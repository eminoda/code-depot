declare const _default: () => {
    render(info: import("@module-federation/bridge-react").RenderFnParams & {
        [key: string]: unknown;
    }): Promise<void>;
    destroy(info: {
        moduleName: string;
        dom: HTMLElement;
    }): Promise<void>;
    rawComponent: import("react").ComponentType<import("../demo/Form.tsx").FormProps>;
    __BRIDGE_FN__: (_args: import("../demo/Form.tsx").FormProps) => void;
};
export default _default;
