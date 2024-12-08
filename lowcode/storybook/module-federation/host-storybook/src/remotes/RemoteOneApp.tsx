import React from "react";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

export interface RemoteOneAppProps {
  /** Is this the principal call to action on the page? */
  name?: string;
}

const RemoteOne = loadRemote("mf_remote_one/App");
const RemoteOneApp2 = React.lazy(() => RemoteOne);

/** Primary UI component for user interaction */
export const RemoteOneApp = ({ name = "Hello MF", ...props }: RemoteOneAppProps) => {
  // return <div style={{ color: "red" }}>1</div>;
  return <RemoteOneApp2 name={name} {...props} />;
};
