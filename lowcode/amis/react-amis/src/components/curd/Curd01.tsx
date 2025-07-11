import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        "type": "page",
        "title": "CURD 基本用法",
        "body": {
            "type": "crud",
            "api": "/amis/api/mock2/sample",
            "syncLocation": false,
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
