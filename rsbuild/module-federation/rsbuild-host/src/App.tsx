import "./App.css";
import React, { Suspense, useEffect } from "react";

const RemoteOneApp = React.lazy(() => import("remote_one/App"));
import { createApp } from "vue";
// import RemoteTwo from "remote_two/App";

// import { Title } from "remote_sb/Title";
// import { Title, Name } from "remote_sb";

// const { Button } = React.lazy(() => import("remote_storybook/Button"));
// import { Button } from "remote_storybook/Button";

const App = () => {
  useEffect(() => {
    // createApp(RemoteTwo).mount("#abc");
  }, []);
  return (
    <div className="content">
      <h1>Rsbuild Module Federation Host</h1>
      <div id="abc"></div>
      <div>
        <Suspense fallback={<div>Loading remote_one error</div>}>
          <RemoteOneApp />
          {/* <div id="abc"></div> */}
          {/* <List name={"abc"} /> */}
          {/* <Title name="title2" /> */}
          {/* <Name name="title2" /> */}
          {/* <Button primary size="large" label="test" /> */}
        </Suspense>
      </div>
    </div>
  );
};

export default App;
