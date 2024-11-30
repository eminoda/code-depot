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

// const StoryBookLoader = runtime.loadRemote("remote_storybook");

const Button = runtime.loadComponent("remote_storybook/Button");
const List = runtime.loadComponent("remote_storybook/List");
const Tabs = runtime.loadComponent("remote_storybook/Tabs");
// const Form = runtime.loadComponent("remote_storybook/Form");

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
        <List
          columns={[
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
                  level: "link",
                  className: "text-danger",
                  disabledOn: "this.grade === 'A'",
                },
              ],
            },
          ]}
        />
        <Tabs
          tabs={[
            { title: "选项1", tab: "1" },
            { title: "选项2", tab: "2" },
          ]}
        />
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
};
export default Demo;
