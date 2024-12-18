import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Form } from "./Form";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "remote-react/Form",
  component: Form,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    title: "用户注册",
    api: "/amis/api/mock2/form/saveForm",
    fields: [
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
    ],
  },
};
