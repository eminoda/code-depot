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
    value: { username: "12" },
    onSubmit: (args) => {
      console.log("submit", args);
    },
    children: ({ control, onSubmit, trigger }) => {
      return (
        <>
          <Controller
            name="username"
            label="username"
            mode="horizontal"
            control={control}
            isRequired
            rules={{
              required: true,
              maxLength: 5,
              minLength: 3,
            }}
            render={({ field, fieldState }) => {
              console.log(field, fieldState);
              return (
                <InputBox
                  mode="inline"
                  placeholder="username"
                  {...field}
                  errortext={fieldState.error}
                  onChange={(value: string) => {
                    field.onChange(value);
                    trigger(field.name);
                  }}
                />
              );
            }}
          />
          <Controller
            name="jobs"
            label="jobs"
            mode="horizontal"
            control={control}
            isRequired
            render={({ field, fieldState }) => {
              return (
                <Select
                  {...field}
                  mode="full"
                  options={[
                    {
                      label: "A",
                      value: "a",
                    },
                    {
                      label: "B",
                      value: "b",
                    },
                    {
                      label: "C",
                      value: "c",
                    },
                  ]}
                  placeholder="请输入"
                  errortext={fieldState.error}
                />
              );
            }}
          />
          <Controller
            name="submit"
            mode="horizontal"
            render={() => {
              return (
                <Button onClick={onSubmit} level="primary">
                  提交
                </Button>
              );
            }}
          />
        </>
      );
    },
  },
};
