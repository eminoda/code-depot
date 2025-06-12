import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        "type": "page",
        "title": "支持数据域的组件",
        "data": {
            "name": "zhangsan"
        },
        "body": [
            {
                "type": "tpl",
                "tpl": "my name is ${name}"
            },
            {
                "type": "service",
                "data": {
                    "name": "lisi"
                },
                "body": {
                    "type": "container",
                    "body": {
                        "type": "tpl",
                        "tpl": "my name is ${name}"
                    }
                }
            }
            // 直接在 container 中，是获取不到 name 的
            // {
            //     "type": "container",
            //     "data": {
            //         "name": "lisi"
            //     },
            //     "body": {
            //         "type": "tpl",
            //         "tpl": "my name is ${name}"
            //     }
            // }

        ]
    });
    return <AmisRender schema={schema} />
};
