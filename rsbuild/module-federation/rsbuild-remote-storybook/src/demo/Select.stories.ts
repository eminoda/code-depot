import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Select } from "./Select";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Demo/Select",
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: {
      control: "text",
      description: "名称",
    },
    name: {
      control: "text",
      description: "字段",
      table: {
        defaultValue: { summary: "name" },
      },
    },
    value: {
      control: "text",
      description: "初始化值",
    },
    options: {
      type: "string",
      control: {
        type: "select",
      },
      options: [
        { label: "选项1", value: 1 },
        { label: "选项2", value: 2 },
      ],
      description: "选项",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onChange: (value) => {
      fn();
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    type: "select",
    label: "选项",
    name: "name",
    source: "/amis/api/mock2/form/getOptions?waitSeconds=1",
    options: [
      { label: "选项1", value: 1 },
      { label: "选项2", value: 2 },
    ],
    onChange: (value) => {
      console.log(value);
    },
  },
};
