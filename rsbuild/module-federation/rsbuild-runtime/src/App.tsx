import Runtime from "./sdk.tsx";
import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";

import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import * as amis from "amis";

const info = {
  el: "#demoRef",
  remotes: [
    {
      name: "remote_one",
      entry: "http://localhost:2001/mf-manifest.json",
      // entry: "http://localhost:3000/remote_one/mf-manifest.json",
    },
    // {
    //   name: "remote_two",
    //   entry: "http://localhost:2002/mf-manifest.json",
    // },
    {
      name: "remote_storybook",
      entry: "http://127.0.0.1:2003/mf-manifest.json",
    },
  ],
  shared: {
    axios: {
      version: "1.6.8",
      scope: "default",
      lib: () => axios,
    },
    react: {
      version: "18.3.1",
      scope: "default",
      lib: () => React,
    },
    "react-dom/client": {
      version: "18.3.1",
      scope: "default",
      lib: () => ReactDOM,
    },
    amis: {
      version: "6.9.0-rc.10",
      scope: "default",
      lib: () => amis,
    },
  },
};
// const runtime = new Runtime(info);
// runtime.init(info);

const runtime = new Runtime(info);

// @ts-ignore
// const RemoteOneApp = lazy(() => runtime.lazyLoadRemote("remote_one/App"));
const RemoteOneApp = runtime.loadComponent("remote_one/App");

// const Input = runtime.loadComponent("remote_storybook/Input");
const Button = runtime.loadComponent<React.ComponentType<import("../@mf-types/remote_storybook/compiled-types/demo/Button").ButtonProps>>("remote_storybook/Button");
// const List = runtime.loadComponent<React.ComponentType<import("../@mf-types/remote_storybook/compiled-types/demo/List").ListProps>>("remote_storybook/List");
// const Form = runtime.loadComponent<React.ComponentType<import("../@mf-types/remote_storybook/compiled-types/demo/Form").FormProps>>("remote_storybook/Form");
// const Tabs = runtime.loadComponent<React.ComponentType<import("../@mf-types/remote_storybook/compiled-types/demo/Tabs").TabsProps>>("remote_storybook/Tabs");

const Demo = () => {
  return (
    <div id="demo">
      <RemoteOneApp />1
      <Button label="确定" level="info" onClick={() => {}} size="md" />

      {/* <div>
        <h2>Form</h2>
        <hr />
        <Form
          title="表单标题"
          api="/amis/api/mock2/form/saveForm"
          items={[
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
          ]}
        />
      </div>

      <div>
        <h2>Button</h2>
        <hr />
        <Button label="确定" level="info" onClick={() => {}} size="md" />
      </div>

      <div>
        <h2>List</h2>
        <hr />
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
      </div>
      <div>
        <h2>Tabs</h2>
        <hr />
        <Tabs
          type="tabs"
          tabs={[
            { title: "选项1", tab: "1" },
            { title: "选项2", tab: "2" },
          ]}
        />
      </div> */}
    </div>
  );
};
export default Demo;
