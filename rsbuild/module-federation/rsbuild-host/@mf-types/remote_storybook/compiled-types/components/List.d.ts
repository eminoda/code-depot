import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";
export interface ListProps {
    columns: {
        name: string;
        label: string;
        buttons?: {
            label: string;
            type: string;
            level: string;
            actionType?: string;
            className?: string;
            disabledOn?: string;
            dialog?: {
                title?: string;
                body: {
                    type: string;
                    body: {
                        type: string;
                        name: string;
                        label: string;
                        body?: {
                            type: string;
                            label: string;
                            displayMode: string;
                            color: string;
                        };
                    }[];
                };
            }[];
        }[];
    }[];
}
export declare const List: ({ columns }: ListProps) => import("react/jsx-runtime").JSX.Element;
