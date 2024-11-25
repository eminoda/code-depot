import "./App.css";
import React, { Suspense, useEffect } from "react";
const RemoteOneApp = React.lazy(() => import("remote_one/App"));
import { createApp } from "vue";
import RemoteTwo from "remote_two/App";

const App = () => {
  useEffect(() => {
    createApp(RemoteTwo).mount("#abc");
  }, []);
  return (
    <div className="content">
      <h1>Rsbuild Module Federation Host</h1>
      <div id="abc"></div>
      <div>
        <Suspense fallback={<div>Loading remote_one error</div>}>
          <RemoteOneApp />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
