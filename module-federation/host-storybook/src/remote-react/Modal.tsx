import React from "react";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

export interface R1ButtonProps {
  /** Is this the principal call to action on the page? */
  open: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  children?: string;
}

const ModalRemote = loadRemote("remote_react_rsbuild/Modal");

const _Modal = React.lazy(() => ModalRemote);

/** Primary UI component for user interaction */
export const Modal = ({ ...props }: R1ButtonProps) => {
  return (
    <_Modal open={props.open} onOk={props.onOk} onCancel={props.onCancel}>
      {props.children}
    </_Modal>
  );
};
