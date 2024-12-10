import React from "react";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

export interface R1ButtonProps {
  /** Is this the principal call to action on the page? */
  name?: string;
  type?: "link" | "text" | "default" | "primary" | "dashed";
}

const R1ButtonRemote = loadRemote("remote_one/R1Button");

const _R1Button = React.lazy(() => R1ButtonRemote);

/** Primary UI component for user interaction */
export const R1Button = ({ name = "Hello MF", ...props }: R1ButtonProps) => {
  return <_R1Button name={name} {...props} />;
};
