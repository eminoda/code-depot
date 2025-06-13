import axios from "axios";
import copy from "copy-to-clipboard";
import { render as renderAmis, Schema, RenderOptions } from 'amis';
import {
    ToastLevel,
    alert,
    confirm,
} from 'amis';
import { ToastComponent, toast, AlertComponent, } from "amis-ui";

// fa字体
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/css/v4-shims.css'

// 主题
// import 'amis/lib/themes/antd.css';
import 'amis-ui/lib/themes/antd.css';

// 帮助类
import 'amis/sdk/iconfont.css';
import 'amis/lib/helper.css';

let amisScoped;
let locale = "zh-CN";

const options: RenderOptions = {
    theme: "antd",
    // 下面三个接口必须实现
    // 发请求，必须要 fetch
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

        // 请求取消
        if(config.cancelExecutor) {
            config.cancelToken = new (axios as any).CancelToken(config.cancelExecutor);
        }
        config.headers = headers || {};
        // get 请求
        if(method !== "post" && method !== "put" && method !== "patch") {
            if(data) {
                config.params = data;
            }
            return (axios as any)[method](url, config);
        }
        // form 表单
        else if(data && data instanceof FormData) {
            config.headers = config.headers || {};
            config.headers["Content-Type"] = "multipart/form-data";
        }
        // json 数据
        else if(data && typeof data !== "string" && !(data instanceof Blob) && !(data instanceof ArrayBuffer)) {
            data = JSON.stringify(data);
            config.headers = config.headers || {};
            config.headers["Content-Type"] = "application/json";
        }
        return (axios as any)[method](url, data, config);
    },
    isCancel: (value: any) => (axios as any).isCancel(value),
    // copy: (content) => {
    //   copy(content);
    //   // toast.success("内容已复制到粘贴板");
    // },
    // toast 提示
    notify: (
        type: ToastLevel, msg: any
    ) => {
        toast[type]
            ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
            : console.warn('[Notify]', type, msg);
    },
    alert,
    confirm,
}
const AmisRender = (props: { schema: Schema }) => {
    return <>
        <ToastComponent
            theme={options.theme}
            key="toast"
            locale={locale}
        />
        <AlertComponent theme={options.theme} key="alert" locale={locale} />

        {renderAmis(
            props.schema,
            {
                // props...
                // locale: 'en-US' // 请参考「多语言」的文档
                // scopeRef: (ref: any) => (amisScoped = ref)  // 功能和前面 SDK 的 amisScoped 一样
            },
            options
        )}
    </>
}

export default AmisRender;