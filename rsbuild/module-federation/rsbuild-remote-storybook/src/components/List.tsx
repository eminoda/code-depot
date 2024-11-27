import { render as renderAmis } from "amis";
import axios from "axios";
import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";

export interface ListProps {
  columns: {
    name: string;
    label: string;
    buttons?: {
      label: string;
      type: string;
      level: string;
      actionType?: string;
      className?: string;
      disabledOn?: string;
      dialog?: {
        title?: string;
        body: {
          type: string;
          body: {
            type: string;
            name: string;
            label: string;
            body?: {
              type: string;
              label: string;
              displayMode: string;
              color: string;
            };
          }[];
        };
      }[];
    }[];
  }[];
}

export const List = ({ columns }: ListProps) => {
  return (
    <div>
      <h3>Remote Storybook</h3>
      <p>Rsbuild + React + Storybook</p>
      <div>
        {renderAmis(
          {
            type: "page",
            // title: "hello amis",
            // body: "内容",
            body: {
              type: "crud",
              api: "/amis/api/mock2/sample",
              syncLocation: false,
              columns,
            },
          },
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
      </div>
    </div>
  );
};
