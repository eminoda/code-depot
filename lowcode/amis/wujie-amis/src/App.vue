<template>
  <div id="app">
    <h2>我是自应用</h2>
    <div id="root"></div>
  </div>
</template>

<script>
import amisRequire from "amis";
export default {
  name: "App",
  mounted() {
    let amis = amisRequire("amis/embed");

    // let amisJSON = {
    //   "type": "page",
    //   "body": [
    //     {
    //       "type": "flex",
    //       "justify": "space-around",
    //       "alignItems": "center",
    //       "direction": "row",
    //       "style": {
    //         "width": 350,
    //         "height": 30
    //       },
    //       "items": [
    //         {
    //           "type": "tooltip-wrapper",
    //           "content": "提示文字",
    //           "body": "hover 激活文字提示",
    //           "className": "mb-1"
    //         },
    //         {
    //           rootClose: false,
    //           "type": "tooltip-wrapper",
    //           "title": "标题",
    //           "content": "提示文字",
    //           "trigger": "click",
    //           "body": "click 激活文字提示",
    //           "className": "mb-1"
    //         }
    //       ]
    //     }
    //   ]
    // }

    // 通过替换下面这个配置来生成不同页面
    let amisJSON = {
      type: "page",
      body: {
        type: "crud",
        api: "/amis/api/mock2/sample",
        syncLocation: false,
        // defaultIsOpened: false,
        // closeOnOutside: false,
        columnsTogglable: false,
        columns: [
          {
            name: "id",
            label: "ID",
          },
          {
            name: "engine",
            label: "Rendering engine",
          },
          {
            name: "browser",
            label: "Browser",
          },
          {
            name: "platform",
            label: "Platform(s)",
          },
          {
            name: "version",
            label: "Engine version",
          },
          {
            name: "grade",
            label: "CSS grade",
          },
          {
            type: "operation",
            label: "操作",
            buttons: [
              {
                label: "详情",
                type: "button",
                level: "link",
                actionType: "dialog",
                dialog: {
                  title: "查看详情",
                  body: {
                    type: "form",
                    body: [
                      {
                        type: "input-text",
                        name: "engine",
                        label: "Engine",
                      },
                      {
                        type: "input-text",
                        name: "browser",
                        label: "Browser",
                      },
                      {
                        type: "input-text",
                        name: "platform",
                        label: "platform",
                      },
                      {
                        type: "input-text",
                        name: "version",
                        label: "version",
                      },
                      {
                        type: "control",
                        label: "grade",
                        body: {
                          type: "tag",
                          label: "${grade}",
                          displayMode: "normal",
                          color: "active",
                        },
                      },
                    ],
                  },
                },
              },
              {
                label: "删除",
                type: "button",
                level: "link",
                className: "text-danger",
                disabledOn: "this.grade === 'A'",
              },
            ],
          },
        ],
      },
    };

    // let amisJSON = {
    //   "type": "page",
    //   "body": {
    //     "type": "dropdown-button",
    //     "label": "下拉菜单",
    //     "buttons": [
    //       {
    //         "type": "button",
    //         "label": "按钮1",
    //         "disabled": true
    //       },
    //       {
    //         "type": "button",
    //         "label": "按钮2"
    //       },
    //       {
    //         "type": "button",
    //         "label": "按钮3"
    //       }
    //     ]
    //   }
    // }
    amis.embed("#root", amisJSON, {}, { theme: "antd" });
  },
};
</script>

<style></style>
