import { render as renderAmis } from "../amis";
import { ButtonSchema } from "amis";
// import { observer } from "mobx-react-lite";

export interface ButtonProps {
  label: string;
  size?: "xs" | "sm" | "md" | "lg";
  level?: "link" | "primary" | "secondary" | "info" | "success" | "warning" | "danger" | "light" | "dark" | "default";
  onClick: (event: Event, props: ButtonSchema) => void;
}

// export const Button = observer(({ label = "确认", size = "md", level = "primary", store, ...props }: ButtonProps) => {
export const Button = ({ label = "确认", size = "md", level = "primary", ...props }: ButtonProps) => {
  return (
    <div>
      {renderAmis({
        type: "button",
        label,
        size,
        level,
        onClick: (event: Event, schema: ButtonSchema) => {
          props.onClick(event, schema);
        },
      })}
    </div>
  );
};
