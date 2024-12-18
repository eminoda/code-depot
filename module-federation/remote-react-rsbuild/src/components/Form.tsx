import { createBridgeComponent } from "@module-federation/bridge-react";
import React from "react";
import renderAmis from "../amis/render";
import { ToastComponent } from "amis";

interface FormProps {
  /** 表单标题 */
  title?: string;
  /** 业务接口 */
  api: string;
  /** 表单项 */
  fields: {
    /** 类型 */
    type: string;
    /** 字段 */
    name: string;
    /** 名称 */
    label: string;
  }[];
}

const Form: React.FC<FormProps> = (props) => {
  return (
    <>
      <ToastComponent key="toast" />
      {renderAmis({
        type: "page",
        body: {
          type: "form",
          title: props.title,
          api: props.api,
          body: props.fields,
        },
      })}
    </>
  );
};

export default createBridgeComponent({
  rootComponent: Form,
});
