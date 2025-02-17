import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { makeAutoObservable, configure } from "mobx";
import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Demo/Button",
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: {
      control: "text",
      description: "名称",
    },
    size: {
      type: "string",
      control: {
        type: "select",
        labels: { xs: "极小", sm: "小", md: "中等", lg: "大" },
      },
      table: {
        defaultValue: { summary: "md" },
      },
      options: ["xs", "sm", "md", "lg"],
      description: "大小",
    },
    level: {
      type: "string",
      control: {
        type: "select",
        labels: {
          link: "链接",
          primary: "主要",
          secondary: "次要",
          info: "信息",
          success: "成功",
          warning: "警告",
          danger: "危险",
          light: "浅色",
          dark: "深色",
          default: "默认",
        },
      },
      options: ["link", "primary", "secondary", "info", "success", "warning", "danger", "light", "dark", "default"],
      description: "基础样式",
      table: {
        defaultValue: { summary: "info" },
      },
    },
    onClick: {
      type: "function",
      description: "点击事件",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

configure({ isolateGlobalState: true });
const store = makeAutoObservable({
  count: 0,
  increase() {
    this.count += 1;
  },
});
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    store,
    label: "确定",
    size: "md",
    level: "info",
    onClick: (...args) => {
      console.log(args);
      store.increase();
    },
  },
};
