import React from "react";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

export interface R1ButtonProps {
  /** Is this the principal call to action on the page? */
  open: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  children?: string;
}

const R1ModalRemote = loadRemote("remote_one/R1Modal");

const _R1Modal = React.lazy(() => R1ModalRemote);

/** Primary UI component for user interaction */
export const R1Modal = ({ ...props }: R1ButtonProps) => {
  return (
    <_R1Modal open={props.open} onOk={props.onOk} onCancel={props.onCancel}>
      {props.children}
    </_R1Modal>
  );
};
