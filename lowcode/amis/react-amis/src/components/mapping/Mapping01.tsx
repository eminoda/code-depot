import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>(
        {
            "type": "page",
            title: "数据映射",
            "body": {
                "type": "form",
                "data": {
                    "a": "1",
                    "b": "2",
                    // "c": {
                    //     "e": "3",
                    //     "f": "4",
                    //     "g": "5"
                    // },
                    // 提取 c 下的所有字段
                    "&": "${c}"
                },
                "api": {
                    "method": "post",
                    "url": "/amis/api/mock2/form/saveForm",
                    "data": {
                        "userName": "${name}",
                        "userEmail": "${email}",
                        "e": "${c.e}",
                        "f": "${c.f}",
                        "g": "${c.g}"
                    }
                },
                "body": [
                    {
                        "type": "input-text",
                        "name": "name",
                        "label": "姓名："
                    },
                    {
                        "name": "email",
                        "type": "input-text",
                        "label": "邮箱："
                    }
                ]
            }
        }
    );
    return <AmisRender schema={schema} />
};
