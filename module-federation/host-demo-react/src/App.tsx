import "./App.css";
import React, { version } from "react";
import ReactDOM from "react-dom";
import Runtime from "@runtime";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { createRemoteComponent } from "@module-federation/bridge-react";
import * as antd from "antd";
import axios from "axios";
import Hello from "./Hello.vue";
import { applyVueInReact, lazyPureVueInReact, lazyVueInReact } from "veaury";
import { defineAsyncComponent, h } from "vue";
import * as Vue from "vue";
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
    vue: {
      version: "3.5.13",
      lib: () => Vue,
    },
  },
};

// runtime bridge react 加载组件
const runtimeBridgeReact = new RuntimeBridgeReact(options);
const RuntimeBridgeReactButton = runtimeBridgeReact.loadRemoteComponent("remote_react_rsbuild/Button");

const runtimeBridgeVue = new RuntimeBridgeVue(options);
const RuntimeBridgeVueButton = runtimeBridgeVue.loadRemoteComponent("remote_vue_rsbuild/Button", true);
const RuntimeBridgeVueButtonInReact = lazyPureVueInReact(RuntimeBridgeVueButton, {
  vue: {
    componentWrapAttrs: { abc: 1 },
  },
});

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
      <RuntimeBridgeReactButton name="hello" />
      <RuntimeBridgeVueButtonInReact name="hello2" />

      {/* <BasicWithNormal name="123" /> */}
    </div>
  );
};

export default App;
