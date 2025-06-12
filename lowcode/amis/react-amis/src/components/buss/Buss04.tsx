import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        "type": "page",
        title: '表单数据穿梭',
        "body": [
            {
                "type": "form",
                "title": "form1",
                "mode": "horizontal",
                "api": "/amis/api/mock2/form/saveForm",
                "body": [
                    {
                        "label": "Name",
                        "type": "input-text",
                        "name": "name"
                    },
                    {
                        "label": "Email",
                        "type": "input-text",
                        "name": "email"
                    },
                    {
                        "label": "Company",
                        "type": "input-text",
                        "name": "company"
                    }
                ],
                "actions": [
                    {
                        "type": "action",
                        "actionType": "reload",
                        "label": "发送到 form2",
                        "target": "form2?name=${name}&email=${email}"
                    }
                ]
            },
            {
                "type": "form",
                "title": "form2",
                "name": "form2",
                "mode": "horizontal",
                "api": "/amis/api/mock2/form/saveForm",
                "body": [
                    {
                        "label": "MyName",
                        "type": "input-text",
                        "name": "name"
                    },
                    {
                        "label": "MyEmail",
                        "type": "input-text",
                        "name": "email"
                    },
                    {
                        "label": "Company",
                        "type": "input-text",
                        "name": "company"
                    }
                ]
            }
        ]
    });
    return <AmisRender schema={schema} />
};
