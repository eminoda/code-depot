import { render as renderAmis, Schema, toast } from "amis";
import axios from "axios";
import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";

export default (schemaJson: Schema) => {
  return renderAmis(
    schemaJson,
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
      confirm: (msg: string) => {
        console.log(msg);
        return Promise.resolve(true);
      },
      notify: (type, msg, conf) => {
        return toast[type](msg, conf);
      },
    }
  );
};
