import "./App.css";
import { init, loadRemote, loadShare } from "@module-federation/enhanced/runtime";
import { createRemoteComponent } from "@module-federation/bridge-react";
import React from "react";
import ReactDOM from "react-dom";

// import RuntimeLib from "@runtime"

import RuntimeLib from "RuntimeLib";
console.log("RuntimeLib", RuntimeLib);

const info = {
  name: "mf_host",
  remotes: [
    {
      name: "mf_remote_one",
      // entry: "http://localhost:2001/mf-manifest.json",
      entry: "http://localhost:2000/mf_remote_one/mf-manifest.json",
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

// --- 直接集成 mf runtime(@module-federation/enhanced/runtime)---
// init(info);
// const RemoteOne = loadRemote("mf_remote_one/App");
// const RemoteOneApp = React.lazy(() => RemoteOne);

// --- 通过自定义 sdk runtime(sdk 内部包装 @module-federation/enhanced/runtime) ----
// const runtime = new RuntimeLib(info);
// const RemoteOne = runtime.loadRemote("mf_remote_one/App");
// const RemoteOneApp = React.lazy(() => RemoteOne);

// --- bridge-react(@module-federation/bridge-react)---
// init(info);
// const FallbackErrorComp = (info: any) => {
//   return (
//     <div>
//       <h2>This is ErrorBoundary Component</h2>
//       <p>Something went wrong:</p>
//       <pre style={{ color: "red" }}>{info?.error.message}</pre>
//       <button onClick={() => info.resetErrorBoundary()}>resetErrorBoundary(try again)</button>
//     </div>
//   );
// };
// const FallbackComp = <div data-test-id="loading">loading...</div>;

// const RemoteOneApp = createRemoteComponent({
//   loader: () => loadRemote("mf_remote_one/App"),
//   fallback: FallbackErrorComp,
//   loading: FallbackComp,
// });

// 通过自定义 sdk bridge runtime
// const runtime = new RuntimeLib(info);
// OPS：要么就 exteneral 把 react 导出
// const RemoteOneApp = runtime.createRemoteComponent("mf_remote_one/App");

const App = () => {
  return (
    <div className="content">
      <h1>mf host</h1>
      <RemoteOneApp />
    </div>
  );
};

export default App;
