declare const _default: () => {
    render(info: import("@module-federation/bridge-react").RenderFnParams & {
        [key: string]: unknown;
    }): Promise<void>;
    destroy(info: {
        moduleName: string;
        dom: HTMLElement;
    }): Promise<void>;
    rawComponent: import("react").ComponentType<import("amis-ui/lib/components/FormField").ControllerProps>;
    __BRIDGE_FN__: (_args: import("amis-ui/lib/components/FormField").ControllerProps) => void;
};
export default _default;
