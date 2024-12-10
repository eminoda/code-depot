import React from "react";
import { Modal } from "antd";

const R1Modal: React.FC<{ open: boolean; onOk: () => void; onCancel: () => void; children?: string }> = (props) => {
  return (
    <Modal open={props.open} onOk={props.onOk} onCancel={props.onCancel}>
      {props.children}
    </Modal>
  );
};

export default R1Modal;
