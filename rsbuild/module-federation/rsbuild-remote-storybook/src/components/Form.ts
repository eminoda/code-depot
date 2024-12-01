import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";

import { createBridgeComponent } from "@module-federation/bridge-react";
import { Form } from "../demo/form/Form.tsx";
import { Controller } from "../demo/form/Controller.tsx";

export default createBridgeComponent({
  rootComponent: Form,
});
