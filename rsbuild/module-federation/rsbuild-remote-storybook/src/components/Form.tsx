import { render as renderAmis } from "../amis";
import { ButtonSchema } from "amis";

import { InputTextProps } from "./InputText";

type FormItemProps = InputTextProps;

export interface FormProps {
  api: string;
  title?: string;
  size?: "xs" | "sm" | "md" | "lg" | "full";
  mode?: "horizontal" | "normal" | "inline";
  items: FormItemProps[];
  preview?: {
    show: boolean;
    api: string;
  };
}

export const Form = ({ size = "full", title, preview, api, mode = "normal", items, ...props }: FormProps) => {
  return renderAmis({
    type: "page",
    body: {
      type: "form",
      title,
      api,
      mode,
      static: preview?.show,
      initApi: preview?.api ? preview?.api : "",
      body: items.map((item) => {
        return {
          ...item,
        };
      }),
    },
  });
};
