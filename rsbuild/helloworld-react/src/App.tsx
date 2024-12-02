import "./App.css";
import Runtime from "RuntimeLib";

// import React from "react";
// import ReactDOM from "react-dom/client";
// import axios from "axios";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { createRemoteComponent } from "@module-federation/bridge-react";

init({
  name: "runtime",
  remotes: [
    {
      name: "remote_one",
      entry: "http://localhost:3000/remote_one/mf-manifest.json",
    },
    {
      name: "remote_storybook",
      entry: "http://localhost:2003/mf-manifest.json",
    },
  ],
  shared: {},
});

// const runtimeIns = new Runtime({
//   el: ".content",
//   remotes: [
//     {
//       name: "remote_one",
//       entry: "http://localhost:3000/remote_one/mf-manifest.json",
//     },
//     // {
//     //   name: "remote_storybook",
//     //   entry: "http://localhost:2003/mf-manifest.json",
//     // },
//   ],
//   // shared: {
//   //   axios: {
//   //     version: "1.6.8",
//   //     scope: "default",
//   //     lib: () => axios,
//   //   },
//   //   react: {
//   //     version: "18.3.1",
//   //     scope: "default",
//   //     lib: () => React,
//   //   },
//   //   "react-dom/client": {
//   //     version: "18.3.1",
//   //     scope: "default",
//   //     lib: () => ReactDOM,
//   //   },
//   // },
// });

// @ts-ignore
// const RemoteOneApp = runtimeIns.loadComponent("remote_one/App");
// const RemoteOneApp = createRemoteComponent({
//   loader: () => loadRemote("remote_one/App"),
// });
// const Button = runtimeIns.loadComponent("remote_storybook/Button");
const Button = createRemoteComponent({
  loader: () => loadRemote("remote_storybook/Button"),
});

// console.log(Button);
const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      {/* <RemoteOneApp /> */}
      <Button label="确定" level="info" onClick={() => {}} size="md" />
    </div>
  );
};

export default App;
