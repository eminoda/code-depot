import "./App.css";
import { createBridgeComponent } from "@module-federation/bridge-react";
import App from "./App";

// export default App;
export default createBridgeComponent({
  rootComponent: App,
});
