import { render as renderAmis } from "../amis";

export interface TabsProps {
  type: "tabs";
  source?: string;
  swipeable?: boolean;
  tabs?: { title: string; tab: string }[];
  onChange?: (data: { value: string; name: string }) => void;
}

export const Tabs = ({ type = "tabs", tabs, ...props }: TabsProps) => {
  const Tab1 = () => <h2>1</h2>;
  const Tab12 = () => <h2>2</h2>;

  return renderAmis({
    type,
    swipeable: true,
    tabs: [
      { title: "tab1", tab: <Tab1/> },
      { title: "tab2", tab: <Tab12/> },
    ],
    onEvent: {
      change: {
        actions: [
          {
            actionType: "custom",
            script: `
              context.props.onChange&&context.props.onChange(event.data);
              event.stopPropagation();
              
            `,
          },
        ],
      },
    },
    onChange: props.onChange,
  });
};
