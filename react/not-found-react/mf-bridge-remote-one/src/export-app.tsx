import App from "./App.tsx";
import { createBridgeComponent } from "@module-federation/bridge-react";

// export default App
export default createBridgeComponent({
  rootComponent: App,
});
