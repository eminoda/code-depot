import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

// import { init, loadRemote } from "@module-federation/enhanced/runtime";
// import { createRemoteComponent } from "@module-federation/bridge-react";

// import Runtime from "RuntimeLib";

const options = {
  el: ".content",
  name: "hello_react",
  remotes: [
    {
      name: "remote_one",
      entry: "http://localhost:3000/remote_one/mf-manifest.json",
    },
    {
      name: "remote_storybook",
      // entry: "http://localhost:2003/mf-manifest.json",
      entry: "http://localhost:3000/remote_storybook/mf-manifest.json",
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
      single: true,
      scope: "default",
      lib: () => React,
    },
    "react-dom/client": {
      single: true,
      version: "18.3.1",
      scope: "default",
      lib: () => ReactDOM,
    },
  },
};

// ----- 通过 mf 直接加载 ----
// init(options);
// const RemoteOneApp = createRemoteComponent({
//   loader: () => loadRemote("remote_one/App"),
//   fallback: (info: any) => {
//     return (
//       <div>
//         <h2>This is ErrorBoundary Component</h2>
//         <p>Something went wrong:</p>
//         <pre style={{ color: "red" }}>{info?.error.message}</pre>
//         <button onClick={() => info.resetErrorBoundary()}>resetErrorBoundary(try again)</button>
//       </div>
//     );
//   },
//   loading: <div data-test-id="loading">loading...</div>,
// });

// ----- 通过 sdk 加载 ----
console.log(RuntimeLib);
const runtimeIns = new RuntimeLib(options);
// runtimeIns.init(options);
// const info = {
//   loader: () => runtimeIns.loadRemote("remote_one/App"),
//   fallback: (info: any) => {
//     return (
//       <div>
//         <h2>This is ErrorBoundary Component</h2>
//         <p>Something went wrong:</p>
//         <pre style={{ color: "red" }}>{info?.error.message}</pre>
//         <button onClick={() => info.resetErrorBoundary()}>resetErrorBoundary(try again)</button>
//       </div>
//     );
//   },
//   loading: <div data-test-id="loading">loading...</div>,
// };
// console.log("ready createRemoteComponent");
// const RemoteOneApp = runtimeIns.createRemoteComponent(info);
const RemoteOneApp = runtimeIns.loadComponent("remote_one/App");
const Button = runtimeIns.loadComponent("remote_storybook/Button");
const List = runtimeIns.loadComponent("remote_storybook/List");

// const Button = createRemoteComponent({
//   loader: () => runtimeIns.loadRemote("remote_storybook/Button"),
//   fallback: (info: any) => {
//     return (
//       <div>
//         <h2>This is ErrorBoundary Component</h2>
//         <p>Something went wrong:</p>
//         <pre style={{ color: "red" }}>{info?.error.message}</pre>
//         <button onClick={() => info.resetErrorBoundary()}>resetErrorBoundary(try again)</button>
//       </div>
//     );
//   },
//   loading: <div data-test-id="loading">loading...</div>,
// });

// @ts-ignore
// const RemoteOneApp = runtimeIns.loadComponent("remote_one/App");
// const RemoteOne = runtimeIns.lazyLoadRemote("remote_one/App");
// const RemoteOneApp = React.lazy(
//   () =>
//     new Promise((resolve) => {
//       RemoteOne.then((data) => {
//         console.log(data);
//         resolve(data);
//       });
//     })
// );

// console.log(Button);
const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <RemoteOneApp />
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
    </div>
  );
};

export default App;
