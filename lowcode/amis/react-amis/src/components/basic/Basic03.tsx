import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        type: "page",
        title: "测试简单的多组件嵌套",
        "body": [
            {
                "type": "tpl",
                "tpl": "Hello World!"
            },
            {
                "type": "divider"
            },
            {
                "type": "form",
                "body": [
                    {
                        "type": "input-text",
                        "name": "name",
                        "label": "姓名"
                    }
                ]
            }
        ]
    });
    return <AmisRender schema={schema} />
};
