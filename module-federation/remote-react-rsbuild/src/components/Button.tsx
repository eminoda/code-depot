import React from "react";
import { Button } from "antd";
import { createBridgeComponent } from "@module-federation/bridge-react";
import axios from "axios";

const _Button: React.FC<{ type: "link" | "text" | "default" | "primary" | "dashed" | undefined; name: string }> = (props) => {
  const req = () => {
    console.log('axios')
    axios.get("https://aisuda.bce.baidu.com/amis/api/mock2/sample?perPage=5");
  };
  return (
    <Button type={props.type} onClick={req}>
      {props.name}
    </Button>
  );
};

// export default _Button;

export default createBridgeComponent({
  rootComponent: _Button,
});
