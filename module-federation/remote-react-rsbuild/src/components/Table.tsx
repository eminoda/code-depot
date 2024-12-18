import { createBridgeComponent } from "@module-federation/bridge-react";
import React from "react";
import renderAmis from "../amis/render";

const Form: React.FC = () => {
  return renderAmis({
    type: "page",
    body: {
      type: "crud",
      api: "/amis/api/mock2/sample",
      syncLocation: false,
      columns: [
        {
          name: "id",
          label: "ID",
        },
        {
          name: "engine",
          label: "Rendering engine",
        },
        {
          name: "browser",
          label: "Browser",
        },
        {
          name: "platform",
          label: "Platform(s)",
        },
        {
          name: "version",
          label: "Engine version",
        },
        {
          name: "grade",
          label: "CSS grade",
        },
        {
          type: "operation",
          label: "操作",
          buttons: [
            {
              label: "详情",
              type: "button",
              level: "link",
              actionType: "dialog",
              dialog: {
                title: "查看详情",
                body: {
                  type: "form",
                  api: "post:/amis/api/mock2/sample/${id}",
                  body: [
                    {
                      type: "input-text",
                      name: "engine",
                      label: "Engine",
                    },
                    {
                      type: "input-text",
                      name: "browser",
                      label: "Browser",
                    },
                    {
                      type: "input-text",
                      name: "platform",
                      label: "platform",
                    },
                    {
                      type: "input-text",
                      name: "version",
                      label: "version",
                    },
                    {
                      type: "control",
                      label: "grade",
                      body: {
                        type: "tag",
                        label: "${grade}",
                        displayMode: "normal",
                        color: "active",
                      },
                    },
                  ],
                },
              },
            },
            {
              label: "删除",
              type: "button",
              level: "danger",
              disabledOn: "this.grade === 'A'",
              confirmText: "确认要删除？",
              api: "delete:/amis/api/mock2/sample/${id}",
              actionType: "ajax",
            },
          ],
        },
      ],
    },
  });
};

export default createBridgeComponent({
  rootComponent: Form,
});
