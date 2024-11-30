import { render as renderAmis } from "../amis";

export interface SelectProps {
  type: "select";
  label: string;
  name: string;
  source: string;
  size?: "xs" | "sm" | "md" | "lg" | "full";
  options?: { label: string; value: string | number }[];
  value?: string;
  onChange?: (data: { value: string; name: string }) => void;
}

export const Select = ({ type = "select", label, size = "md", name = "name", source, options = [], value = "", ...props }: SelectProps) => {
  return renderAmis({
    type,
    label,
    size,
    name,
    value,
    source,
    options,
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
