import { render as renderAmis } from "../amis";

export interface ListProps {
  columns: {
    name?: string;
    label: string;
    type?: string;
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
            name?: string;
            label: string;
            body?: {
              type: string;
              label: string;
              displayMode: string;
              color: string;
              body?: {
                type: string;
                label: string;
                displayMode: string;
                color: string;
              };
            };
          }[];
        };
      };
    }[];
  }[];
}

export const List = ({ columns }: ListProps) => {
  return (
    <div>
      <h3>Remote Storybook</h3>
      <p>Rsbuild + React + Storybook</p>
      <div>
        {renderAmis({
          type: "page",
          // title: "hello amis",
          // body: "内容",
          body: {
            type: "crud",
            api: "/amis/api/mock2/sample",
            syncLocation: false,
            columns,
          },
        })}
      </div>
    </div>
  );
};
