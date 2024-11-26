import "./App.css";
import React, { Suspense, useEffect } from "react";

const RemoteOneApp = React.lazy(() => import("remote_one/App"));
const RemoteTwoApp = React.lazy(() => import("./LoadVueComponent"));

import Button from "remote_storybook/Button";

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild Module Federation Host</h1>
      <div id="abc"></div>
      <div>
        {/* <Suspense fallback={<div>Loading remote_one error</div>}>{<RemoteOneApp />}</Suspense> */}
        {/* <Suspense fallback={<div>Loading remote_two error</div>}>{<RemoteTwoApp />}</Suspense> */}
        <Suspense fallback={<div>Loading remote_storybook error</div>}>
          {/* <Title name="abc" /> */}
          <Button label="abc"/>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
