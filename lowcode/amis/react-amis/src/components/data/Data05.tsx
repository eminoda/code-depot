import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        "title": "数据域的更新机制",
        "data": {
            "name": "amis"
        },
        "type": "page",
        "body": [
            {
                "label": "请修改输入框",
                "type": "input-text",
                "name": "name"
            },
            {
                "type": "switch",
                "label": "同步更新",
                "name": "syncSwitch"
            },
            {
                "type": "crud",
                "filter": {
                    "trackExpression": "${syncSwitch ? name : ''}",
                    "body": [
                        "my name is ${name}"
                    ]
                }
            }
        ]
    });
    return <AmisRender schema={schema} />
};
