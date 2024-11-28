import { render as renderAmis } from "../amis";

export interface ButtonProps {
  label: string;
  size?: "xs" | "sm" | "md" | "lg";
  level?: "link" | "primary" | "secondary" | "info" | "success" | "warning" | "danger" | "light" | "dark" | "default";
  onClick: () => void;
}

export const Button = ({ label = "确认", size = "md", level = "primary", ...props }: ButtonProps) => {
  return renderAmis({
    type: "button",
    label,
    size,
    level,
    onClick: props.onClick,
  });
};
