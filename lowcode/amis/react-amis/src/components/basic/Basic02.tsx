import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        type: "page",
        title: "测试简单的单组件嵌套",
        "body": {
            "type": "tpl",
            "tpl": "Hello World!"
        }
    });
    return <AmisRender schema={schema} />
};
