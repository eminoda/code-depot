import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";

import { createBridgeComponent } from "@module-federation/bridge-react";
import { Controller } from "../demo/form/Controller";

export default createBridgeComponent({
  rootComponent: Controller,
});
