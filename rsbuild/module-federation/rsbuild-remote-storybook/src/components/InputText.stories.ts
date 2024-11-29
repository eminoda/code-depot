import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { InputText } from "./InputText";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Demo/InputText",
  component: InputText,
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
    size: {
      type: "string",
      control: {
        type: "select",
        labels: { xs: "极小", sm: "小", md: "中等", lg: "大", full: "占满" },
      },
      options: ["xs", "sm", "md", "lg", "full"],
      description: "大小",
    },
    layout: {
      type: "string",
      control: {
        type: "select",
        labels: { horizontal: "水平", vertical: "垂直", inline: "内联" },
      },
      options: ["horizontal", "vertical", "inline"],
      description: "布局",
      table: {
        defaultValue: { summary: "inline" },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onInput: (value) => {
      fn();
    },
  },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    type: "input-text",
    label: "名称",
    name: "name",
    onInput: (value) => {
      console.log(value);
    },
  },
};
