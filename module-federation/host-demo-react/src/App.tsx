import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import Runtime from "@runtime";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { createRemoteComponent } from "@module-federation/bridge-react";

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
  ],
  shared: {
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
  },
};

const runtime = new Runtime(options);
console.log(runtime);

// mf runtime 加载组件
// init(options);
// const RemoteReactRsbuildButtonModel = loadRemote("remote_react_rsbuild/Button");
// const RemoteReactRsbuildButtonModel = runtime.loadRemote("remote_react_rsbuild/Button");
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
const RemoteReactRsbuildButton = runtime.createRemoteComponent2("remote_react_rsbuild/Button");

const App = () => {
  return (
    <div className="content">
      <h1>host-demo-react</h1>
      <p>remote-react-rsbuild</p>
      <RemoteReactRsbuildButton type="primary" name="弹框1" />
      {/* <p>remote-react-vite</p>
      <RemoteReactViteButton type="primary" name="弹框2" /> */}
    </div>
  );
};

export default App;
