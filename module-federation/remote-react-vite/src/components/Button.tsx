import React from "react";
import { Button } from "antd";
import { createBridgeComponent } from "@module-federation/bridge-react";

const _Button: React.FC<{ type: "link" | "text" | "default" | "primary" | "dashed" | undefined; name: string }> = (props) => {
  return <Button type={props.type}>{props.name}</Button>;
};

// export default R1Button;
export default createBridgeComponent({
  rootComponent: _Button,
});
