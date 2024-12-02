import { createBridgeComponent } from "@module-federation/bridge-react";
import { InputBox } from "../demo/form/InputBox.tsx";

export default createBridgeComponent({
  rootComponent: InputBox,
});
