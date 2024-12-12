import "./App.css";
import React from "react";
import ReactDOM from "react-dom";

import { init, loadRemote } from "@module-federation/enhanced/runtime";

init({
  name: "host_storybook",
  remotes: [
    {
      name: "remote_react_rsbuild",
      entry: "http://localhost:2001/mf-manifest.json",
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
});

const RemoteReactRsbuildButtonModel = loadRemote("remote_react_rsbuild/Button");

const RemoteReactRsbuildButton = React.lazy(() => RemoteReactRsbuildButtonModel);

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <RemoteReactRsbuildButton type="primary" name="弹框" />
    </div>
  );
};

export default App;
