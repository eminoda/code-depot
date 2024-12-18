import { createBridgeComponent } from "@module-federation/bridge-react";
import React from "react";
import renderAmis from "../amis/render";

interface ButtonType {
  label: string;
  type: string;
  level: string;
  actionType: string;
  dialog?: DialogType;
  disabledOn?: string;
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
interface TableProps {
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
    buttons?: ButtonType[];
    type?: string;
  }[];
}
const Form: React.FC<TableProps> = (props) => {
  return renderAmis({
    type: "page",
    body: {
      type: "crud",
      api: props.api,
      syncLocation: false,
      columns: props.columns,
      // columns: [
      //   {
      //     name: "id",
      //     label: "ID",
      //   },
      //   {
      //     name: "engine",
      //     label: "Rendering engine",
      //   },
      //   {
      //     name: "browser",
      //     label: "Browser",
      //   },
      //   {
      //     name: "platform",
      //     label: "Platform(s)",
      //   },
      //   {
      //     name: "version",
      //     label: "Engine version",
      //   },
      //   {
      //     name: "grade",
      //     label: "CSS grade",
      //   },
      //   {
      //     type: "operation",
      //     label: "操作",
      //     buttons: [
      //       {
      //         label: "详情",
      //         type: "button",
      //         level: "link",
      //         actionType: "dialog",
      //         dialog: {
      //           title: "查看详情",
      //           body: {
      //             type: "form",
      //             api: "post:/amis/api/mock2/sample/${id}",
      //             body: [
      //               {
      //                 type: "input-text",
      //                 name: "engine",
      //                 label: "Engine",
      //               },
      //               {
      //                 type: "input-text",
      //                 name: "browser",
      //                 label: "Browser",
      //               },
      //               {
      //                 type: "input-text",
      //                 name: "platform",
      //                 label: "platform",
      //               },
      //               {
      //                 type: "input-text",
      //                 name: "version",
      //                 label: "version",
      //               },
      //               {
      //                 type: "control",
      //                 label: "grade",
      //                 body: {
      //                   type: "tag",
      //                   label: "${grade}",
      //                   displayMode: "normal",
      //                   color: "active",
      //                 },
      //               },
      //             ],
      //           },
      //         },
      //       },
      //       {
      //         label: "删除",
      //         type: "button",
      //         level: "danger",
      //         disabledOn: "this.grade === 'A'",
      //         confirmText: "确认要删除？",
      //         api: "delete:/amis/api/mock2/sample/${id}",
      //         actionType: "ajax",
      //       },
      //     ],
      //   },
      // ],
    },
  });
};

export default createBridgeComponent({
  rootComponent: Form,
});
