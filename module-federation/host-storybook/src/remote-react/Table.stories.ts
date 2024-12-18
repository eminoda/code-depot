import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Table } from "./Table";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "remote-react/Table",
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    api: "/amis/api/mock2/sample",
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
};
