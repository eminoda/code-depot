import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import Runtime from "runtime";
// import { init, loadRemote } from "@module-federation/enhanced/runtime";

const options = {
  name: "host_storybook",
  remotes: [
    {
      name: "remote_react_rsbuild",
      entry: "http://localhost:2001/mf-manifest.json",
    },
    {
      name: "remote_react_vite",
      entry: "http://localhost:2002/mf-manifest.json",
    },
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

// init(options);

const runtime = new Runtime(options);
const RemoteReactRsbuildButtonModel = runtime.loadRemote("remote_react_rsbuild/Button");

const RemoteReactRsbuildButton = React.lazy(() => RemoteReactRsbuildButtonModel);

const RemoteReactViteButtonModel = runtime.loadRemote("remote_react_vite/Button");

const RemoteReactViteButton = React.lazy(() => RemoteReactViteButtonModel);

const App = () => {
  return (
    <div className="content">
      <h1>host-demo-react</h1>
      <p>remote-react-rsbuild</p>
      <RemoteReactRsbuildButton type="primary" name="弹框1" />
      <p>remote-react-vite</p>
      <RemoteReactViteButton type="primary" name="弹框2" />
    </div>
  );
};

export default App;
