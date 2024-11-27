import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";
import { fetcher } from "./amis";

import { ButtonSchema, CRUDCommonSchema, render as renderAmis } from "amis";

import { DialogActionSchema } from "amis/lib/renderers/Action";

type ButtonOperation = ButtonSchema | DetailButtonSchema;

interface DetailButtonSchema extends ButtonSchema {
  actionType: "dialog";
  dialog: {
    title: string;
    body: {
      type: "form";
      body: { type: string; name: string; label: string }[];
    };
  };
}
interface Operation {
  label: string;
  type: "operation";
  buttons: ButtonOperation[];
}
interface BaseColumn {
  label: string;
  name: string;
}

type CurdColumn = BaseColumn | Operation;
export interface TableProps {
  title: string;
  curd: CRUDCommonSchema & {
    columns: CurdColumn[];
  };
}

/** Primary UI component for user interaction */
export const Table = ({ title, curd }: TableProps) => {
  const amisJSON = {
    // 页面
    type: "page",
    title,
    // 表单
    body: curd,
  };

  return <>{renderAmis(amisJSON, {}, { fetcher })}</>;
};
