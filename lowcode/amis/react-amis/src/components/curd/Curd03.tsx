import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        "type": "page",
        "title": "CURD 操作按钮栏",
        "body": [
            // 增加按钮
            {
                "label": "新增",
                "type": "button",
                "actionType": "dialog",
                "level": "primary",
                "className": "m-b-sm",
                "dialog": {
                    "title": "新增表单",
                    "body": {
                        "type": "form",
                        "api": "post:/amis/api/mock2/sample",
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
                            }
                        ]
                    }
                }
            },
            {
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
                        "buttons": [{
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
                            "label": "修改",
                            "type": "button",
                            "level": "link",
                            "actionType": "drawer",
                            "drawer": {
                                "title": "修改",
                                "body": {
                                    "type": "form",
                                    "initApi": "/amis/api/mock2/sample/${id}",
                                    "api": "post:/amis/api/mock2/sample/${id}",
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
                            "disabledOn": "this.grade === 'A'",
                            "actionType": "ajax",
                            "confirmText": "确认要删除？",
                            "api": "delete:/amis/api/mock2/sample/${id}",
                        }]
                    }
                ],
            }
        ]
    });
    return <AmisRender schema={schema} />
};
