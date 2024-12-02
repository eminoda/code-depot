import { createBridgeComponent } from "@module-federation/bridge-react";
import { Button } from "../demo/Button";

export default createBridgeComponent({
  rootComponent: Button,
});
