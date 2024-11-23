import React, { Suspense } from "react";
const RemoteApp = React.lazy(() => import("ComponentB/App"));

function App() {
  return (
    <>
      <Suspense fallback={"loading..."}>
        <RemoteApp />
      </Suspense>
    </>
  );
}

export default App;
