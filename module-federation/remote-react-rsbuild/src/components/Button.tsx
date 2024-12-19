import { createBridgeComponent } from "@module-federation/bridge-react";
import React from "react";
import { Button, message } from "antd";
import axios from "axios";

type ButtonType = "link" | "text" | "default" | "primary" | "dashed";

const _Button: React.FC<{ type: ButtonType; name: string }> = (props) => {
  const req = async () => {
    await axios.get("https://aisuda.bce.baidu.com/amis/api/mock2/sample?perPage=5");
    message.success("请求成功");
  };
  return (
    <Button type={props.type} onClick={req}>
      {props.name}
    </Button>
  );
};

export default _Button;

// export default createBridgeComponent({
//   rootComponent: _Button,
// });
