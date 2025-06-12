declare class Runtime {
    constructor(options: RuntimeOptions);
    loadRemoteComponent(componentName: string, isVueInReact?: boolean): import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions, {}, any> | (() => Promise<{
        default: import("vue").DefineComponent<{}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
    }>);
}
export default Runtime;
