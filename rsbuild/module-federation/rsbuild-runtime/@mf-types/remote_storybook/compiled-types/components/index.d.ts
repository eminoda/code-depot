import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";
declare const _default: {
    Button: () => {
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
    List: () => {
        render(info: import("@module-federation/bridge-react").RenderFnParams & {
            [key: string]: unknown;
        }): Promise<void>;
        destroy(info: {
            moduleName: string;
            dom: HTMLElement;
        }): Promise<void>;
        rawComponent: import("react").ComponentType<import("../demo/List").ListProps>;
        __BRIDGE_FN__: (_args: import("../demo/List").ListProps) => void;
    };
    Tabs: () => {
        render(info: import("@module-federation/bridge-react").RenderFnParams & {
            [key: string]: unknown;
        }): Promise<void>;
        destroy(info: {
            moduleName: string;
            dom: HTMLElement;
        }): Promise<void>;
        rawComponent: import("react").ComponentType<import("../demo/Tabs").TabsProps>;
        __BRIDGE_FN__: (_args: import("../demo/Tabs").TabsProps) => void;
    };
    Form: () => {
        render(info: import("@module-federation/bridge-react").RenderFnParams & {
            [key: string]: unknown;
        }): Promise<void>;
        destroy(info: {
            moduleName: string;
            dom: HTMLElement;
        }): Promise<void>;
        rawComponent: import("react").ComponentType<import("amis-ui/lib/components/Form").FormProps>;
        __BRIDGE_FN__: (_args: import("amis-ui/lib/components/Form").FormProps) => void;
    };
};
export default _default;
