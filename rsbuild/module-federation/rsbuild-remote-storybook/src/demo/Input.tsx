import { render as renderAmis } from "../amis";

export interface SelectProps {
  type?: "input-text" | "input-password" | "input-date";
  label: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "full";
  placeholder: string;
  layout?: "horizontal" | "vertical" | "inline";
  value?: string;
  onInput?: (data: { value: string; name: string }) => void;
}

export const Input = ({ type = "input-text", placeholder = "请输入", label, size = "md", name = "name", layout, value = "", ...props }: SelectProps) => {
  console.log(props);
  return renderAmis(
    {
      type,
      label,
      placeholder,
      size,
      name,
      value,
      mode: ["horizontal", "inline"].includes(layout || "inline") ? "inline" : "",
      onEvent: {
        change: {
          actions: [
            {
              actionType: "custom",
              script: `
              console.log(context.props);
              context.props.onInput&&context.props.onInput(event.data);
              event.stopPropagation();
              
            `,
            },
          ],
        },
      },
      ...props,
    },
    { onInput: props.onInput }
  );
};
