import type { Meta, StoryObj } from "@storybook/react";

import { Button, InputBox, Select, FormItem } from "amis";
import { Controller } from "./Controller.tsx";
import { Form } from "./Form";
// import { FormProps } from "amis-ui/lib/components/Form";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Demo/Form",
  component: Form,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: {
      type: {
        name: "object",
        required: false,
        value: {
          "[key]": {
            required: false,
            name: "string",
          },
        },
      },
      table: {
        type: { summary: "表单数据" },
        defaultValue: { summary: `Record<string,any>` },
        category: "props",
      },
    },
    onSubmit: {
      type: "function",
      description: "表单提交事件",
      table: {
        type: { summary: "function" },
        defaultValue: { summary: `(value: any) => void` },
        category: "events",
      },
    },
    children: {
      type: "function",
      description: "表单组件 children 元素",
      table: {
        type: { summary: "function" },
        defaultValue: {
          summary: `
(methods: UseFormReturn & { onSubmit: (value: any) => void; }) => JSX.Element | null`,
        },
        category: "events",
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    title: "表单标题",
    api: "/amis/api/mock2/form/saveForm",
    items: [
      {
        type: "input-text",
        name: "name",
        label: "姓名：",
      },
      {
        name: "email",
        type: "input-email",
        label: "邮箱：",
      },
      {
        name: "mycustom",
        asFormItem: true,
        // @ts-ignore
        children({ value, onChange, data }) {
          return (
            <div>
              <p>这个是个自定义组件</p>
              <p>当前值：{value}</p>
              <a className="btn btn-default" onClick={() => onChange(Math.round(Math.random() * 10000))}>
                随机修改
              </a>
            </div>
          );
        },
      },
    ],
  },
};
