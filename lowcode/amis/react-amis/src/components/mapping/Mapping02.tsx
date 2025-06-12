import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
    // {"items":[{"a":"a1","c":"c1"},{"a":"a2","c":"c2"},{"a":"a3","c":"c3"}]}
    const [schema] = useState<Schema>(
        {
            "type": "page",
            "body": {
                "type": "form",
                "api": {
                    "method": "post",
                    "url": "/amis/api/mock2/form/saveForm",
                    "data": {
                        "items": {
                            "$table": {
                                "a": "${a}",
                                "c": "${c}"
                            }
                        }
                    }
                },
                "body": [
                    {
                        "type": "input-table",
                        "name": "table",
                        "label": "table",
                        "columns": [
                            {
                                "label": "A",
                                "name": "a"
                            },
                            {
                                "label": "B",
                                "name": "b"
                            },
                            {
                                "label": "C",
                                "name": "c"
                            }
                        ],
                        "value": [
                            {
                                "a": "a1",
                                "b": "b1",
                                "c": "c1"
                            },
                            {
                                "a": "a2",
                                "b": "b2",
                                "c": "c2"
                            },
                            {
                                "a": "a3",
                                "b": "b3",
                                "c": "c3"
                            }
                        ]
                    }
                ]
            }
        }
    );
    return <AmisRender schema={schema} />
};
