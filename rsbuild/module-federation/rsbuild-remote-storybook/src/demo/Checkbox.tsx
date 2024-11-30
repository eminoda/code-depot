import { render as renderAmis } from "../amis";

export interface CheckboxProps {
  type: "checkboxes" | "checkbox";
  label: string;
  name: string;
  source: string;
  size?: "xs" | "sm" | "md" | "lg" | "full";
  options?: { label: string; value: string | number }[];
  value?: string;
  onChange?: (data: { value: string; name: string }) => void;
}

export const Checkbox = ({ type = "checkboxes", label, size = "md", name = "name",source, options = [], value = "", ...props }: CheckboxProps) => {
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
              console.log(args,event,context);
              context.props.onChange&&context.props.onChange(event.data);
              event.stopPropagation();
              
            `,
          },
        ],
      },
    },
  });
};
