import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        type: "page",
        title: "测试简单的内容",
        body: "页面内容",
    });
    return <AmisRender schema={schema} />
};
