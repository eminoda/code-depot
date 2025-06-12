import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        "type": "page",
        "title": '跨组件查询',
        "body": [
            {
                "title": "查询条件",
                "type": "form",
                "target": "my_crud",
                "body": [
                    {
                        "type": "input-text",
                        "name": "keywords",
                        "label": "关键字："
                    }
                ],
                "submitText": "搜索"
            },
            {
                "type": "crud",
                "name": "my_crud",
                "api": "/amis/api/mock2/sample",
                "columns": [
                    {
                        "name": "id",
                        "label": "ID"
                    },
                    {
                        "name": "engine",
                        "label": "Rendering engine"
                    },
                    {
                        "name": "browser",
                        "label": "Browser"
                    },
                    {
                        "name": "platform",
                        "label": "Platform(s)"
                    },
                    {
                        "name": "version",
                        "label": "Engine version"
                    }
                ]
            }
        ]
    });
    return <AmisRender schema={schema} />
};
