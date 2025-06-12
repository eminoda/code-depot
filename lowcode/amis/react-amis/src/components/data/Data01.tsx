import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        "type": "page",
        "title": "简单的数据域",
        data: {
            date: 'noop' // 会被接口覆盖
        },
        "initApi": "/amis/api/mock2/page/initData",
        "body": "date is ${date}，text is ${text}"
    });
    return <AmisRender schema={schema} />
};
