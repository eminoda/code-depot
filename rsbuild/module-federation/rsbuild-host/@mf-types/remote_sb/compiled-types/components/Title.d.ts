export interface TitleProps {
    name: string;
    subName?: string;
    /** Optional click handler */
    onClick?: () => void;
}
/** Primary UI component for user interaction */
export declare const Title: ({ name, subName, ...props }: TitleProps) => import("react/jsx-runtime").JSX.Element;
