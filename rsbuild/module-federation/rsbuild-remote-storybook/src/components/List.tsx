import { render as renderAmis } from "amis";
import axios from "axios";
import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";

export const List = () => {
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
              columns: [
                {
                  name: "id",
                  label: "ID",
                },
                {
                  name: "engine",
                  label: "Rendering engine",
                },
                {
                  name: "browser",
                  label: "Browser",
                },
                {
                  name: "platform",
                  label: "Platform(s)",
                },
                {
                  name: "version",
                  label: "Engine version",
                },
                {
                  name: "grade",
                  label: "CSS grade",
                },
                {
                  type: "operation",
                  label: "操作",
                  buttons: [
                    {
                      label: "详情",
                      type: "button",
                      level: "link",
                      actionType: "dialog",
                      dialog: {
                        title: "查看详情",
                        body: {
                          type: "form",
                          body: [
                            {
                              type: "input-text",
                              name: "engine",
                              label: "Engine",
                            },
                            {
                              type: "input-text",
                              name: "browser",
                              label: "Browser",
                            },
                            {
                              type: "input-text",
                              name: "platform",
                              label: "platform",
                            },
                            {
                              type: "input-text",
                              name: "version",
                              label: "version",
                            },
                            {
                              type: "control",
                              label: "grade",
                              body: {
                                type: "tag",
                                label: "${grade}",
                                displayMode: "normal",
                                color: "active",
                              },
                            },
                          ],
                        },
                      },
                    },
                    {
                      label: "删除",
                      type: "button",
                      level: "link",
                      className: "text-danger",
                      disabledOn: "this.grade === 'A'",
                    },
                  ],
                },
              ],
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
