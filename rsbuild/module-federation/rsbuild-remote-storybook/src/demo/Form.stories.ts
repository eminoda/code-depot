import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Form } from "./Form";

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
    api: {
      control: "text",
      description: "api",
    },
    size: {
      type: "string",
      control: {
        type: "select",
        labels: { xs: "极小", sm: "小", md: "中等", lg: "大", full: "占满" },
      },
      table: {
        defaultValue: { summary: "full" },
      },
      options: ["xs", "sm", "md", "lg", "full"],
      description: "大小",
    },
    items: {
      control: {
        type: "object",
      },
    },
    preview: {
      show: {
        control: {
          type: "boolean",
        },
      },
      api: {
        control: {
          type: "string",
        },
      },
      description: `{show: boolean, api: string}`
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
    api: "/amis/api/mock2/form/saveForm",
    size: "full",
    preview: {
      show: false,
      api: "/amis/api/mock2/form/initData",
    },
    items: [
      {
        type: "input-text",
        name: "name",
        label: "姓名：",
      },
      {
        type: "input-password",
        name: "password",
        label: "密码",
      },
    ],
  },
};
