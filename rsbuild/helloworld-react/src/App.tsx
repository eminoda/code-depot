import "./App.css";
import { useEffect } from "react";
import runtime from "runtime";

const App = () => {
  useEffect(() => {
    console.log(runtime)
    const Runtime = runtime.default;

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

    new Runtime({
      el: ".content",
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
    }).loadRemote("remote_storybook", "List", { columns });
  }, []);
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
    </div>
  );
};

export default App;
