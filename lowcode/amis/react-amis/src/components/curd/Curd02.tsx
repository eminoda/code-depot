import { useState } from "react";
import { ApiObject, Schema } from "amis";
import AmisRender from "../AmisRender";
import { registerFilter } from 'amis';

registerFilter('hello', (value, context) => {
    console.log(value, context);
    return value.map((item: any) => {
        return {
            myField: "my:" + item.engine,
            ...item
        }

    });
})
export default () => {
    const [schema] = useState<Schema>({
        "type": "page",
        "title": "CURD 自定义 api 接口",
        "body": {
            "type": "crud",
            // "api": "/amis/api/mock2/sample",
            // 自定义 api
            api: {
                "method": "post",
                "url": "/amis/api/mock2/sample",
                "headers": {
                    "Auth": "${ls:token}"
                },
                query: {
                    page: "${page}",
                    perPage: "10" //"${perPage}"
                },
                "data": {
                    page: "${page}",
                    perPage: "10" //"${perPage}"
                },
                responseData: {
                    // rows: "${rows|pick:myField~engine}" // 太麻烦了
                    rows: "${rows|hello}" // 通过自定义注册器，完成响应数据的改写
                },
                // 请求拦截
                requestAdaptor: (api: ApiObject, context: any) => {
                    console.log(api, context);
                    return {
                        ...api
                    }
                }
            },
            "syncLocation": false,
            "columns": [
                {
                    "name": "id",
                    "label": "ID"
                },
                {
                    "name": "myField",
                    "label": "myField"
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
                },
                {
                    "name": "grade",
                    "label": "CSS grade"
                },
                {
                    "type": "operation",
                    "label": "操作",
                    "buttons": [
                        {
                            "label": "详情",
                            "type": "button",
                            "level": "link",
                            "actionType": "dialog",
                            "dialog": {
                                "title": "查看详情",
                                "body": {
                                    "type": "form",
                                    "body": [
                                        {
                                            "type": "input-text",
                                            "name": "engine",
                                            "label": "Engine"
                                        },
                                        {
                                            "type": "input-text",
                                            "name": "browser",
                                            "label": "Browser"
                                        },
                                        {
                                            "type": "input-text",
                                            "name": "platform",
                                            "label": "platform"
                                        },
                                        {
                                            "type": "input-text",
                                            "name": "version",
                                            "label": "version"
                                        },
                                        {
                                            "type": "control",
                                            "label": "grade",
                                            "body": {
                                                "type": "tag",
                                                "label": "${grade}",
                                                "displayMode": "normal",
                                                "color": "active"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "label": "删除",
                            "type": "button",
                            "level": "link",
                            "className": "text-danger",
                            "disabledOn": "this.grade === 'A'"
                        }
                    ]
                }
            ],
        }
    });
    return <AmisRender schema={schema} />
};
