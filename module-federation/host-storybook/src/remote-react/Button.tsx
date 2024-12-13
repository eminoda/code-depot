import React from "react";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

export interface R1ButtonProps {
  /** Is this the principal call to action on the page? */
  name?: string;
  type?: "link" | "text" | "default" | "primary" | "dashed";
}

const RemoteReactRsbuildButtonModel = loadRemote("remote_react_vite/Button");

const RemoteReactRsbuildButton = React.lazy(() => RemoteReactRsbuildButtonModel);

/** Primary UI component for user interaction */
export const Button = ({ name = "Hello MF", ...props }: R1ButtonProps) => {
  return <RemoteReactRsbuildButton name={name} {...props} />;
};
