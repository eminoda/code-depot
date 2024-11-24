import "./App.css";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { lazy, Suspense, createElement } from "react";

init({
  name: "@demo/app-main",
  remotes: [
    {
      name: "@demo/rslib_provider",
      // mf-manifest.json is a file type generated in the new version of Module Federation build tools, providing richer functionality compared to remoteEntry
      // Preloading depends on the use of the mf-manifest.json file type
      entry: "http://localhost:3000/mf/mf-manifest.json",
      alias: "rslib_provider",
    },
  ],
});

const loadButton = async () => {
  return new Promise((resolve) => {
    setTimeout(async() => {
      const module = await loadRemote("rslib_provider");
      resolve(module);
    }, 5000);
  });
};

const Button = lazy(() => loadButton().then((md) => ({ default: md.Button })));

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <Suspense fallback={<div>Loading...</div>}>
        <Button label="213" />
      </Suspense>
    </div>
  );
};

export default App;
