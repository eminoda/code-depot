export interface TabsProps {
    type: "tabs";
    source?: string;
    swipeable?: boolean;
    tabs?: {
        title: string;
        tab: string;
    }[];
    onChange?: (data: {
        value: string;
        name: string;
    }) => void;
}
export declare const Tabs: ({ type, tabs, ...props }: TabsProps) => JSX.Element;
