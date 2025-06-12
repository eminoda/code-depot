import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        "type": "page",
        title: '表单主动触发数据获取',
        "body": {
            "type": "form",
            "name": "my_form",
            "body": [
                {
                    "type": "input-text",
                    "name": "keyword",
                    "addOn": {
                        "label": "搜索",
                        "type": "button",
                        "actionType": "reload",
                        "target": "my_form.select"
                    }
                },
                {
                    "type": "select",
                    "name": "select",
                    "label": "Select",
                    "source": {
                        "method": "get",
                        "url": "/amis/api/mock2/form/getOptions?waitSeconds=1",
                        "data": {
                            "a": "${keyword}"
                        }
                    }
                }
            ]
        }
    });
    return <AmisRender schema={schema} />
};
