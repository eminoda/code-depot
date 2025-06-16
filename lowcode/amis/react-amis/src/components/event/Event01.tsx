import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    const [schema] = useState<Schema>({
        "type": "page",
        title: '事件触发',
        "body": [
            {
                "type": "button",
                "label": "尝试点击、鼠标移入/移出",
                "level": "primary",
                "onEvent": {
                    "click": {
                        "actions": [
                            {
                                "actionType": "toast",
                                "args": {
                                    "msgType": "info",
                                    "msg": "派发点击事件"
                                }
                            }
                        ]
                    },
                    "mouseenter": {
                        "actions": [
                            {
                                "actionType": "toast",
                                "args": {
                                    "msgType": "info",
                                    "msg": "派发鼠标移入事件"
                                }
                            }
                        ]
                    },
                    "mouseleave": {
                        "actions": [
                            {
                                "actionType": "toast",
                                "args": {
                                    "msgType": "info",
                                    "msg": "派发鼠标移出事件"
                                }
                            }
                        ]
                    }
                }
            }
        ]
    });
    return <AmisRender schema={schema} />
};
