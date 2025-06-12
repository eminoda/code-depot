import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        "type": "page",
        title: '基础联动',
        "body": {
            "type": "form",
            "body": [
                {
                    "type": "radios",
                    "name": "foo",
                    "label": false,
                    "options": [
                        {
                            "label": "类型1",
                            "value": 1
                        },
                        {
                            "label": "类型2",
                            "value": 2
                        }
                    ]
                },
                {
                    "type": "input-text",
                    "name": "text1",
                    "label": false,
                    "placeholder": "选中 类型1 时可见",
                    "visibleOn": "${foo == 1}"
                },
                {
                    "type": "input-text",
                    "name": "text2",
                    "label": false,
                    "placeholder": "选中 类型2 时不可点",
                    "disabledOn": "${foo == 2}"
                },
                {
                    "label": "根据 foo 值，获取选项",
                    "type": "select",
                    "size": "sm",
                    "name": "b",
                    "source": "/amis/api/mock2/options/level2?a=${foo}",
                    "description": "切换<code>选项1</code>的值，会触发<code>选项2</code>的<code>source</code> 接口重新拉取"
                }
            ]
        }
    });
    return <AmisRender schema={schema} />
};
