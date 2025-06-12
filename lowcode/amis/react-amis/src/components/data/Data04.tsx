import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        "type": "page",
        "title": "表单数据域，api返回数据，url参数的合并",
        "body": {
            "type": "form",
            "api": "/amis/api/mock2/form/saveForm",
            "body": [
                {
                    "type": "input-text",
                    "name": "name",
                    "label": "姓名："
                },
                {
                    "type": "input-text",
                    "name": "age",
                    "label": "年龄："
                },
                {
                    "type": "static-tpl",
                    // 请在当前url 中添加 ?urlName=123 参数
                    "tpl": "生成的id为1：${id}-${name}-${age}-${urlName}"
                }
            ]
        }
    });
    return <AmisRender schema={schema} />
};
