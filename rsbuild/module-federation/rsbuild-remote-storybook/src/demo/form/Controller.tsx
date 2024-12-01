import { Controller as AmisController } from "amis";
import { ControllerProps } from "amis-ui/lib/components/FormField";

export const Controller = (props: ControllerProps) => {
  return <AmisController {...props}>{props.children}</AmisController>;
};
