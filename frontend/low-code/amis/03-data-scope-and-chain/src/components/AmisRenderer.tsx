// css
import "amis/lib/themes/antd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";
// sdk
import { render as renderAmis } from "amis";
import { ToastComponent, AlertComponent, alert, confirm, toast } from "amis-ui";
import type { Schema } from "amis";

// sdk 依赖
import axios from "axios";
import copy from "copy-to-clipboard";

const AmisRenderer = (props: { schema: Schema }) => {
  let amisScoped;
  let theme = "antd";
  let locale = "zh-CN";

  const rootProps = {
    // locale: 'en-US' // 请参考「多语言」的文档
    // scopeRef: (ref: any) => (amisScoped = ref)  // 功能和前面 SDK 的 amisScoped 一样
  };

  const options = {
    // 主题
    theme,
    // 下面三个接口必须实现
    fetcher: ({
      url, // 接口地址
      method, // 请求方法 get、post、put、delete
      data, // 请求数据
      responseType,
      config, // 其他配置
      headers, // 请求头
    }: any) => {
      config = config || {};
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
    isCancel: (value: any) => (axios as any).isCancel(value),
    copy: (content: string) => {
      copy(content);
      toast.success("内容已复制到粘贴板");
    },
    // 后面这些接口可以不用实现
    // 默认是地址跳转
    // jumpTo: (
    //   location: string /*目标地址*/,
    //   action: any /* action对象*/
    // ) => {
    //   // 用来实现页面跳转, actionType:link、url 都会进来。
    // },

    // updateLocation: (
    //   location: string /*目标地址*/,
    //   replace: boolean /*是replace，还是push？*/
    // ) => {
    //   // 地址替换，跟 jumpTo 类似
    // },

    // getModalContainer: () => {
    //   // 弹窗挂载的 DOM 节点
    // },

    // isCurrentUrl: (
    //   url: string /*url地址*/,
    // ) => {
    //   // 用来判断是否目标地址当前地址
    // },

    // notify: (
    //   type: 'error' | 'success' /**/,
    //   msg: string /*提示内容*/
    // ) => {
    //   toast[type]
    //     ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
    //     : console.warn('[Notify]', type, msg);
    // },
    // alert,
    // confirm,
    // tracker: (eventTracke) => {}
  };

  return (
    <>
      <ToastComponent theme={theme} key="toast" position={"top-right"} locale={locale} />
      <AlertComponent theme={theme} key="alert" locale={locale} />
      {renderAmis(props.schema, rootProps, options)}
    </>
  );
};

export default AmisRenderer;
