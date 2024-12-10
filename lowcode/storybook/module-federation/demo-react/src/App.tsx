import "./App.css";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import React from "react";
import ReactDOM from "react-dom";

init({
  name: "@demo",
  remotes: [
    {
      name: "remote_one",
      entry: "http://localhost:2001/mf-manifest.json",

      // alias: "app1"
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

const R1Button = React.lazy(() => loadRemote("remote_one/R1Button"));

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <R1Button type="primary" name="helloRemoteOne" />
    </div>
  );
};

export default App;
