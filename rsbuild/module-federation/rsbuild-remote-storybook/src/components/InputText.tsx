import { render as renderAmis } from "../amis";

export interface InputTextProps {
  label: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  layout?: "horizontal" | "vertical" | "inline";
  value?: string;
  onInput: (data: { value: string; name: string }) => void;
}

export const InputText = ({ label, size = "md", name = "name", layout, value = "", ...props }: InputTextProps) => {
  return renderAmis(
    {
      type: "input-text",
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
              context.props.onInput(event.data);
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
