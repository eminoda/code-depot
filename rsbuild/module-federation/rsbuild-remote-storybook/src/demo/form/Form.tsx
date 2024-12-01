// import { render as renderAmis } from "../amis";
import { Form as AmisForm } from "amis";
import { FormProps } from "amis-ui/lib/components/Form";
import { Button, InputBox, Select, FormItem } from "amis";
import { Controller } from "./Controller.tsx";
// import { Button, InputTable, Form as AForm, Radios, Controller, InputBox } from "amis-ui";

// import { Input } from "./Input";

// export const Form = ({ size = "full", title, preview, api, mode = "normal", items }: FormProps) => {
//   return renderAmis({
//     type: "page",
//     body: {
//       type: "form",
//       title,
//       api,
//       mode,
//       static: preview?.show,
//       initApi: preview?.api ? preview?.api : "",
//       body: items.map((item) => {
//         return { size, ...item };
//       }),
//     },
//   });
// };
export const Form = (props: FormProps) => {
  // return <AmisForm {...props}>{props.children}</AmisForm>;
  return (
    <AmisForm {...props}>
      {({ control, onSubmit, trigger }) => {
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
      }}
    </AmisForm>
  );
};
