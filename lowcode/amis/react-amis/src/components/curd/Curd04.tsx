import { useState } from "react";
import { Schema } from "amis";
import AmisRender from "../AmisRender";

export default () => {
  const [schema] = useState<Schema>({
    "type": "page",
    "body": {
      "type": "crud",
      "api": "/amis/api/mock2/sample",
      "syncLocation": false,
      "headerToolbar": [
        {
          "type": "columns-toggler",
          "align": "right",
          "draggable": true,
          "icon": "fas fa-cog",
          "overlay": true,
          "footerBtnSize": "sm"
        }
      ],
      // autoGenerateFilter 需要和 columns.searchable 配合使用
      "autoGenerateFilter": {
        "columnsNum": 2,
        "showBtnToolbar": false
      },
      // filter 和 autoGenerateFilter 只能使用一个，filter 优先级更高
      // "filter": {
      //   "debug": true,
      //   "title": "条件搜索",
      //   "body": [
      //     {
      //       "type": "group",
      //       "body": [
      //         {
      //           "type": "input-text",
      //           "name": "keywords",
      //           "label": "关键字",
      //           "clearable": true,
      //           "placeholder": "通过关键字搜索",
      //           "size": "sm"
      //         },
      //         {
      //           "type": "input-text",
      //           "name": "engine",
      //           "label": "Engine",
      //           "clearable": true,
      //           "size": "sm"
      //         },
      //         {
      //           "type": "input-text",
      //           "name": "platform",
      //           "label": "Platform",
      //           "clearable": true,
      //           "size": "sm"
      //         }
      //       ]
      //     }
      //   ],
      //   "actions": [
      //     {
      //       "type": "button",
      //       "actionType": "drawer",
      //       "icon": "fa fa-plus",
      //       "label": "创建记录",
      //       "target": "crud",
      //       "closeOnOutside": true,
      //       "drawer": {
      //         "title": "创建记录",
      //         "body": {
      //           "type": "form",
      //           "api": "post:/amis/api/mock2/sample",
      //           "body": [
      //             {
      //               "type": "input-text",
      //               "name": "engine",
      //               "label": "Engine"
      //             },
      //             {
      //               "type": "input-text",
      //               "name": "browser",
      //               "label": "Browser"
      //             }
      //           ]
      //         }
      //       }
      //     },
      //     {
      //       "type": "reset",
      //       "label": "重置"
      //     },
      //     {
      //       "type": "submit",
      //       "level": "primary",
      //       "label": "查询"
      //     }
      //   ]
      // },
      "columns": [
        {
          "name": "id",
          "label": "ID",
          "searchable": {
            "type": "input-text",
            "name": "id",
            "label": "主键",
            "placeholder": "输入id"
          }
        },
        {
          "name": "engine",
          "label": "Rendering engine"
        },
        {
          "name": "browser",
          "label": "Browser",
          "searchable": {
            "type": "select",
            "name": "browser",
            "label": "浏览器",
            "placeholder": "选择浏览器",
            "options": [
              {
                "label": "Internet Explorer ",
                "value": "ie"
              },
              {
                "label": "AOL browser",
                "value": "aol"
              },
              {
                "label": "Firefox",
                "value": "firefox"
              }
            ]
          }
        },
        {
          "name": "platform",
          "label": "Platform(s)"
        },
        {
          "name": "version",
          "label": "Engine version",
          "searchable": {
            "type": "input-number",
            "name": "version",
            "label": "版本号",
            "placeholder": "输入版本号",
            "mode": "horizontal"
          }
        },
        {
          "name": "grade",
          "label": "CSS grade"
        }
      ]
    }
  });
  return <AmisRender schema={schema} />
};
