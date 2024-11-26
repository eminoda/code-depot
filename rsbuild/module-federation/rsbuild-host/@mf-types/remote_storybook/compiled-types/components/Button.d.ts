import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";
export interface ButtonProps {
    onClick?: () => void;
}
/** Primary UI component for user interaction */
export declare const Button: ({ ...props }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
