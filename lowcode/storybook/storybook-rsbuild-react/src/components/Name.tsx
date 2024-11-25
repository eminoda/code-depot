import React from "react";
import { render as renderAmis } from "amis";
import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";
import axios from "axios";
export interface NameProps {
  name: string;
}

/** Primary UI component for user interaction */
export const Name = ({ name = "标题", ...props }: NameProps) => {
  const amisJSON = {
    type: "page",
    title: "简单页面",
    body: "内容",
  };
  return (
    <>
      <h2>{name}</h2>
      <div>测试 amis</div>
      <div>
        1
        {renderAmis(
          amisJSON,
          {},
          {
            fetcher: ({
              url, // 接口地址
              method, // 请求方法 get、post、put、delete
              data, // 请求数据
              responseType,
              config, // 其他配置
              headers, // 请求头
            }: any) => {
              return (axios as any)[method](url, data, config);
            },
            isCancel: (value: any) => true,
            copy: (content) => {},
          }
        )}
        2
      </div>
    </>
  );
};
