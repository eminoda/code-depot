import React from "react";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import runtime from "../../.storybook/store";

export interface TableProps {
  /** 表单标题 */
  title?: string;
  /** 业务接口 */
  api: string;
  /** 表单项 */
  columns: {
    /** 字段 */
    name: string;
    /** 名称 */
    label: string;
    /** 操作栏 */
    buttons: {
      /** 字段 */
      name: string;
      /** 名称 */
      label: string;
    };
  }[];
}

// const RemoteReactRsbuildButtonModel = loadRemote("remote_react_vite/Button");
// const RemoteReactRsbuildButton = React.lazy(() => RemoteReactRsbuildButtonModel);

const RemoteReactRsbuildTable = runtime.createRemoteComponent2("remote_react_rsbuild/Table");

/** Primary UI component for user interaction */
export const Table = ({ ...props }: TableProps) => {
  return <RemoteReactRsbuildTable {...props} />;
};
