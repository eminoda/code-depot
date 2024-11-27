import React, { useEffect } from "react";
import Runtime from "./runtime.ts";
const columns = [
  {
    name: "id",
    label: "I123D",
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
];

const Demo = () => {
  useEffect(() => {
    const runtime = new Runtime({
      el: "#demoRef",
      remotes: [
        {
          name: "remote_one",
          entry: "http://localhost:2001/mf-manifest.json",
        },
        {
          name: "remote_two",
          entry: "http://localhost:2002/mf-manifest.json",
        },
        {
          name: "remote_storybook",
          entry: "http://localhost:2003/mf-manifest.json",
        },
      ],
    });
    runtime.loadRemote("remote_storybook", "List", { columns });
  }, []);
  return (
    <div id="demo">
      <div id="demoRef"></div>
    </div>
  );
};
export default Demo;
