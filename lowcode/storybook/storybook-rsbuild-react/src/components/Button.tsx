import React from "react";
import { render as renderAmis } from "amis";
import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";
import axios from "axios";
export interface ButtonProps {
  onClick?: () => void;
}

const amisJSON = {
  type: "page",
  body: {
    label: "弹个框",
    type: "button",
    actionType: "dialog",
    dialog: {
      title: "弹框",
      body: "这是个简单的弹框。",
    },
  },
};

/** Primary UI component for user interaction */
export const Button = ({ ...props }: ButtonProps) => {
  return (
    <>
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
            config = config || {};
            config.baseURL = "https://aisuda.bce.baidu.com";
            console.log(config);
            config.withCredentials = true;
            responseType && (config.responseType = responseType);

            if (config.cancelExecutor) {
              config.cancelToken = new (axios as any).CancelToken(config.cancelExecutor);
            }

            config.headers = headers || {};

            if (method !== "post" && method !== "put" && method !== "patch") {
              if (data) {
                config.params = data;
              }

              return (axios as any)[method](url, config);
            } else if (data && data instanceof FormData) {
              config.headers = config.headers || {};
              config.headers["Content-Type"] = "multipart/form-data";
            } else if (data && typeof data !== "string" && !(data instanceof Blob) && !(data instanceof ArrayBuffer)) {
              data = JSON.stringify(data);
              config.headers = config.headers || {};
              config.headers["Content-Type"] = "application/json";
            }

            return (axios as any)[method](url, data, config);
          },
        }
      )}
    </>
  );
};
