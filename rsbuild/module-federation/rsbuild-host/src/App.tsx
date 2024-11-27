import "./App.css";
import React, { Suspense, useEffect } from "react";

const RemoteOneApp = React.lazy(() => import("remote_one/App"));
const RemoteTwoApp = React.lazy(() => import("./LoadVueComponent"));

const List = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const List = import("remote_storybook").then((module) => ({
        default: module.List,
      }));
      resolve(List);
    }, 5 * 1000);
  });
});

// const List = React.lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // 动态导入组件
//       import("remote_storybook").then((module) => ({
//         default: module.List,
//       }));
//     }, 500);
//   });
// });
const App = () => {
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
  return (
    <div className="content">
      <h1>Rsbuild Module Federation Host</h1>
      <div id="abc"></div>
      <div>
        {/* <Suspense fallback={<div>Loading remote_one error</div>}>{<RemoteOneApp />}</Suspense> */}
        {/* <Suspense fallback={<div>Loading remote_two error</div>}>{<RemoteTwoApp />}</Suspense> */}
        <Suspense fallback={<div>Loading remote_sb error</div>}>{<List columns={columns} />}</Suspense>
        {/* <Suspense fallback={<div>Loading remote_storybook error</div>}>
          <Title name="abc" />
          <Button label="abc"/>
        </Suspense> */}
      </div>
    </div>
  );
};

export default App;
