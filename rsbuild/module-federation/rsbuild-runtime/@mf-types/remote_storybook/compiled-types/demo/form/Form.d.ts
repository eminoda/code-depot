import { InputProps } from "../Input.ts";
export interface FormProps {
    title: string;
    preview?: {
        show: boolean;
        api: any;
    };
    api?: string;
    mode?: "normal" | "horizontal" | "inline";
    items: InputProps & {
        asFormItem?: boolean;
        children?: ({ value, onChange, data }: {
            value: any;
            onChange: (value: any) => void;
            data: any;
        }) => JSX.Element;
    }[];
}
export declare const Form: ({ title, preview, api, mode, items }: FormProps) => JSX.Element;
