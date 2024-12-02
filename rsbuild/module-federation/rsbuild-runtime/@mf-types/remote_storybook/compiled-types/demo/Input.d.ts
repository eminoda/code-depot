export interface InputProps {
    type?: "input-text" | "input-password" | "input-date";
    label: string;
    name: string;
    size?: "xs" | "sm" | "md" | "lg" | "full";
    placeholder?: string;
    layout?: "horizontal" | "vertical" | "inline";
    value?: string;
    onInput?: (data: {
        value: string;
        name: string;
    }) => void;
}
export declare const Input: ({ type, placeholder, label, size, name, layout, value, ...props }: InputProps) => JSX.Element;
