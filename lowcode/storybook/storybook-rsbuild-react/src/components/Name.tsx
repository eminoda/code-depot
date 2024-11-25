import React from "react";
import { render as renderAmis } from "amis";
import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";

export interface NameProps {
  name: string;
}
const amisJSON = {
  type: "page",
  body: 'HELLO AMIS',
};
/** Primary UI component for user interaction */
export const Name = ({ name = "标题", ...props }: NameProps) => {
  return (
    <>
      <h2>{name}</h2>
      <div>测试 amis</div>
      <div>
        {renderAmis(
          amisJSON,
          {},
          {
            
          }
        )}
      </div>
    </>
  );
};
