import { Schema } from "amis";
interface RootRenderProps {
    location?: Location;
    theme?: string;
    data?: Record<string, any>;
    locale?: string;
    [propName: string]: any;
}
export declare const render: (schema: Schema, props?: RootRenderProps) => JSX.Element;
export {};
