import React from "react";
import { Button } from "antd";

const R1Button: React.FC<{ type: "link" | "text" | "default" | "primary" | "dashed" | undefined; name: string }> = (props) => {
  return <Button type={props.type}>{props.name}</Button>;
};

export default R1Button;
