import { ButtonSchema } from "amis";
export interface ButtonProps {
    label: string;
    size?: "xs" | "sm" | "md" | "lg";
    level?: "link" | "primary" | "secondary" | "info" | "success" | "warning" | "danger" | "light" | "dark" | "default";
    onClick: (event: Event, props: ButtonSchema) => void;
}
export declare const Button: ({ label, size, level, ...props }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
