import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        "type": "page",
        "title": "数据域的嵌套",
        "data": {
            "name": "zhangsan",
            "age": 20
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
                    "type": "tpl",
                    "tpl": "my name is ${name}, I'm ${age} years old"
                }
            }
        ]
    });
    return <AmisRender schema={schema} />
};
