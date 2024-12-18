import React from "react";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import runtime from "../../.storybook/store";

interface ButtonType {
  label: string;
  type: string;
  level: string;
  actionType: string;
  dialog?: DialogType;
  disabledOn?: string;
  confirmText?: string;
  api?: string;
}

interface DialogType {
  title: string;
  body: FormType;
}

interface FormType {
  type: string;
  api: string;
  body: {
    type: string;
    name?: string;
    label: string;
    body?: {
      type: string;
      label: string;
      displayMode?: string;
      color?: string;
    };
  }[];
}
export interface TableProps {
  /** 表单标题 */
  title?: string;
  /** 业务接口 */
  api: string;
  /** 表单项 */
  columns: {
    /** 字段 */
    name?: string;
    /** 名称 */
    label: string;
    /** 操作栏 */
    buttons?: ButtonType[];
    /** 操作类型 */
    type?: string;
  }[];
}

// const RemoteReactRsbuildButtonModel = loadRemote("remote_react_vite/Button");
// const RemoteReactRsbuildButton = React.lazy(() => RemoteReactRsbuildButtonModel);

const RemoteReactRsbuildTable = runtime.createRemoteComponent2("remote_react_rsbuild/Table");

/** Primary UI component for user interaction */
export const Table = ({ ...props }: TableProps) => {
  return <RemoteReactRsbuildTable {...props} />;
};
