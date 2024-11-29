import type { RenderOptions } from "amis";
import { render as renderAmis, Schema } from "amis";
import axios from "axios";

interface RootRenderProps {
  location?: Location;
  theme?: string;
  data?: Record<string, any>;
  locale?: string;
  [propName: string]: any;
}

class Render {
  private options: RenderOptions;
  private props: RootRenderProps;
  constructor(props: RootRenderProps, options: RenderOptions) {
    this.options = options;
    this.props = props;
  }
  render(schema: Schema, props?: RootRenderProps) {
    return renderAmis(schema, Object.assign(this.props, props), this.options);
  }
}

export const render = (schema: Schema, props?: RootRenderProps) => {
  const render = new Render(props || {}, {
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
  });
  return render.render(schema);
};
