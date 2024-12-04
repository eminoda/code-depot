import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";

import { createBridgeComponent } from "@module-federation/bridge-react";
import { List } from "../demo/List";

export default createBridgeComponent({
  rootComponent: List,
});
