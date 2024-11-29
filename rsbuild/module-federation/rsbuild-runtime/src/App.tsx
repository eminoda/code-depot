import React, { lazy, ReactElement, useEffect } from "react";
import Runtime from "./runtime.ts";

const runtime = new Runtime({
  el: "#demoRef",
  remotes: [
    // {
    //   name: "remote_one",
    //   entry: "http://localhost:2001/mf-manifest.json",
    // },
    // {
    //   name: "remote_two",
    //   entry: "http://localhost:2002/mf-manifest.json",
    // },
    {
      name: "remote_storybook",
      // entry: "http://127.0.0.1:2003/mf-manifest.json",
      entry: "http://127.0.0.1:2003/mf-manifest.json",
    },
  ],
});
// @ts-ignore
// const RemoteOneApp = lazy(() => runtime.loadRemote("remote_one/App"));

const StoryBookLoader = runtime.loadRemote("remote_storybook");

const Button = runtime.loadComponent(StoryBookLoader, "Button");
const InputText = runtime.loadComponent(StoryBookLoader, "InputText");
const Form = runtime.loadComponent(StoryBookLoader, "Form");

// const Button = lazy(() => {
//   return new Promise((resolve) => {
//     StoryBookModule.then((module) => {
//       resolve({ default: module.default.Button });
//     });
//   });
// });

const Demo = () => {
  return (
    <div id="demo">
      {/* <RemoteOneApp /> */}
      <div>
        <Button label="确定" level="info" onClick={() => {}} size="md" />
      </div>
      <div>
        <InputText label="姓名" />
      </div>
      <div>
        <Form
          api="/amis/api/mock2/form/saveForm"
          items={[
            {
              label: "姓名：",
              name: "name",
              type: "input-text",
            },
            {
              label: "密码",
              name: "password",
              type: "input-password",
            },
          ]}
          preview={{
            api: "/amis/api/mock2/form/initData",
            show: false,
          }}
          size="full"
        />
      </div>
    </div>
  );
};
export default Demo;
