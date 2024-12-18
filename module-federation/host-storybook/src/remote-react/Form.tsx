import React from "react";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import runtime from "../../.storybook/store";

export interface FormProps {
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

// const RemoteReactRsbuildButtonModel = loadRemote("remote_react_vite/Button");
// const RemoteReactRsbuildButton = React.lazy(() => RemoteReactRsbuildButtonModel);

const RemoteReactRsbuildForm = runtime.createRemoteComponent2("remote_react_rsbuild/Form");

/** Primary UI component for user interaction */
export const Form = ({ ...props }: FormProps) => {
  return <RemoteReactRsbuildForm {...props} />;
};
