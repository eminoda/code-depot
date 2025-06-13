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

    // 通过替换下面这个配置来生成不同页面
    let amisJSON = {
      type: "page",
      body: {
        type: "crud",
        api: "/amis/api/mock2/sample",
        syncLocation: false,
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
    amis.embed("#root", amisJSON);
  },
};
</script>

<style></style>
