import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";

import { createBridgeComponent } from "@module-federation/bridge-react";
import { InputBox } from "../demo/form/InputBox.tsx";

export default createBridgeComponent({
  rootComponent: InputBox,
});
