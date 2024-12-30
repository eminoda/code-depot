import "./App.css";
import React, { version } from "react";
import ReactDOM from "react-dom";
import Runtime from "@runtime";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { createRemoteComponent } from "@module-federation/bridge-react";
import * as antd from "antd";
import axios from "axios";
import Hello from "./Hello.vue";
import { applyVueInReact } from "veaury";
import { defineAsyncComponent } from "vue";
import RuntimeBridgeReact from "RuntimeBridgeReact";
import RuntimeBridgeVue from "RuntimeBridgeVue";

const BasicWithNormal = applyVueInReact(Hello);

const options = {
  name: "host_storybook",
  remotes: [
    {
      name: "remote_react_rsbuild",
      entry: "http://localhost:2001/mf-manifest.json",
    },
    // {
    //   name: "remote_react_vite",
    //   entry: "http://localhost:2002/mf-manifest.json",
    // },
    {
      name: "remote_vue_rsbuild",
      entry: "http://localhost:3001/mf-manifest.json",
    },
  ],
  shared: {
    axios: {
      version: "1.7.9",
      lib: () => axios,
    },
    react: {
      version: "18.3.1",
      lib: () => React,
      // shareConfig: { singleton: true, requiredVersion: "18.5" },
    },
    "react-dom": {
      version: "18.3.1",
      lib: () => ReactDOM,
      // shareConfig: { singleton: true, requiredVersion: "18.5" },
    },
    antd: {
      version: "5.22.4",
      lib: () => antd,
    },
  },
};

// runtime bridge react 加载组件
const runtimeBridgeReact = new RuntimeBridgeReact(options);
const RuntimeBridgeReactButton = runtimeBridgeReact.loadRemoteComponent("remote_react_rsbuild/Button");

const runtimeBridgeVue = new RuntimeBridgeVue(options);
const RuntimeBridgeVueButton = runtimeBridgeVue.loadRemoteComponent("remote_vue_rsbuild/Button");
const RuntimeBridgeVueButtonInReact = applyVueInReact(RuntimeBridgeVueButton)

// mf runtime 加载组件
// init(options);
// const RemoteReactRsbuildButtonModel = loadRemote("remote_react_rsbuild/Button");
// const RemoteReactRsbuildButton = React.lazy(() => RemoteReactRsbuildButtonModel);

// const RemoteReactViteButtonModel = runtime.loadRemote("remote_react_vite/Button");
// const RemoteReactViteButton = React.lazy(() => RemoteReactViteButtonModel);

// mf bridge runtime 加载组件
// init(options);
// const RemoteReactRsbuildButton = runtime.createRemoteComponent({
//   loader: () => runtime.loadRemote("remote_react_rsbuild/Button"),
//   fallback: (info: any) => <div>{info?.error.message}</div>,
//   loading: <div>loading...</div>,
// });
// const RemoteReactRsbuildButton = runtime.createRemoteComponent2("remote_react_rsbuild/Button");
// const RemoteReactRsbuildForm = runtime.createRemoteComponent2("remote_react_rsbuild/Form");
// const RemoteReactRsbuildTable = runtime.createRemoteComponent2("remote_react_rsbuild/Table");
// const RemoteReactViteButton = runtime.createRemoteComponent2("remote_react_vite/Button");
// const RemoteReactViteButtonModel = runtime.loadRemote("remote_react_vite/Button");
// const RemoteReactViteButton = React.lazy(() => RemoteReactViteButtonModel);

const App = () => {
  return (
    <div className="content">
      <h1>host-demo-react</h1>
      <p>remote-react-rsbuild</p>
      {/* <RemoteReactRsbuildButton name="hello"/> */}
      <RuntimeBridgeReactButton name="hello"/>
      <RuntimeBridgeVueButtonInReact name="hello2"/>
      {/* <RemoteReactRsbuildButton type="primary" name="弹框1" />
      <div style={{ width: "600px" }}>
        <RemoteReactRsbuildForm
          {...{
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
          }}
        />
      </div>
      <div style={{ width: "1000px" }}>
        <RemoteReactRsbuildTable
          {...{
            api: "/amis/api/mock2/sample",
            columns: [
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
                        api: "post:/amis/api/mock2/sample/${id}",
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
                    level: "danger",
                    disabledOn: "this.grade === 'A'",
                    confirmText: "确认要删除？",
                    api: "delete:/amis/api/mock2/sample/${id}",
                    actionType: "ajax",
                  },
                ],
              },
            ],
          }}
        />
      </div> */}
      {/* <p>remote-react-vite</p>
      <div>
        <RemoteReactViteButton type="primary" name="弹框2" />
      </div> */}

      {/* <BasicWithNormal /> */}
    </div>
  );
};

export default App;
