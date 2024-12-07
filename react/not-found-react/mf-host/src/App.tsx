import "./App.css";
import { init, loadRemote, loadShare } from "@module-federation/enhanced/runtime";
import React from "react";
import ReactDOM from "react-dom";
import RuntimeLib from "RuntimeLib";

console.log("RuntimeLib", RuntimeLib);

const info = {
  name: "mf_host",
  remotes: [
    {
      name: "mf_remote_one",
      entry: "http://localhost:2001/mf-manifest.json",
      // entry: "http://localhost:2000/mf_remote_one/mf-manifest.json",
    },
  ],
  shared: {
    react: {
      version: "18.3",
      lib: () => React,
      // shareConfig: { singleton: true, requiredVersion: "18.5" },
    },
    "react-dom": {
      version: "18.3",
      lib: () => ReactDOM,
      // shareConfig: { singleton: true, requiredVersion: "18.5" },
    },
  },
};

// init(info);
// const RemoteOne = loadRemote("mf_remote_one/App");

const runtime = new RuntimeLib(info);
const RemoteOne = runtime.loadRemote("mf_remote_one/App");


const RemoteOneApp = React.lazy(() => RemoteOne);

const App = () => {
  return (
    <div className="content">
      <h1>mf host</h1>
      <RemoteOneApp />
    </div>
  );
};

export default App;
