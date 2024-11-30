import { render as renderAmis } from "../amis";

export interface SelectProps {
  type: "input-text" | "input-password" | "input-date";
  label: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "full";
  layout?: "horizontal" | "vertical" | "inline";
  value?: string;
  onInput?: (data: { value: string; name: string }) => void;
}

export const Input = ({ type = "input-text", label, size = "md", name = "name", layout, value = "", ...props }: SelectProps) => {
  return renderAmis(
    {
      type,
      label,
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
    },
    { onInput: props.onInput }
  );
};
