// import { render as renderAmis } from "../amis";
// import { Form as AmisForm } from "amis";
// import { Button, InputBox, Select, FormItem } from "amis";
// import { Controller } from "./Controller.tsx";
// import { Input } from "../Input.tsx";

// import { Button, InputTable, Form as AForm, Radios, Controller, InputBox } from "amis-ui";

import { InputProps } from "./Input.ts";
import { render as renderAmis } from "../amis";

export interface FormProps {
  title: string;
  preview?: { show: boolean; api: any };
  api?: string;
  mode?: "normal" | "horizontal" | "inline";
  items: InputProps &
    {
      asFormItem?: boolean;
      children?: ({ value, onChange, data }: { value: any; onChange: (value: any) => void; data: any }) => JSX.Element;
    }[];
}

export const Form = ({ title, preview, api, mode = "normal", items }: FormProps) => {
  return renderAmis({
    type: "page",
    body: {
      debug: true,
      type: "form",
      title,
      api,
      mode,
      static: preview?.show,
      initApi: preview?.api ? preview?.api : "",
      body: items,
    },
  });
};
