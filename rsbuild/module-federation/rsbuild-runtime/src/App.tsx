import "./App.css";
import { init, loadRemote } from "@module-federation/enhanced/runtime";
import React, { lazy, useEffect, Suspense } from "react";
import ReactDOM from "react-dom";
import { createApp } from "vue";

init({
  name: "rsbuild-runtime",
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
  shared: {
    react: {
      version: "18.3.1",
      scope: "default",
      lib: () => React,
      shareConfig: {
        singleton: true,
        requiredVersion: "^18.3.1",
      },
    },
    "react-dom": {
      version: "18.3.1",
      scope: "default",
      lib: () => ReactDOM,
      shareConfig: {
        singleton: true,
        requiredVersion: "^18.3.1",
      },
    },
  },
});

// @ts-ignore
const RemoteOneApp = lazy(() => loadRemote("remote_one/App"));
const List = lazy(() => {
  return new Promise((resolve) => {
    const List = loadRemote("remote_storybook").then((module) => ({
      // @ts-ignore
      default: module.List,
    }));
    // @ts-ignore
    resolve(List);
  });
});

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
const App = () => {
  // useEffect(() => {
  //   loadRemote("remote_two/App").then((data) => {
  //     // @ts-ignore
  //     createApp(data.default).mount("#vueRef");
  //   });
  // });

  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      {/* <RemoteOneApp />
      <div id="vueRef"></div> */}
      <Suspense fallback={<div>Loading remote_sb error</div>}>
        <RemoteOneApp />
      </Suspense>
      <Suspense fallback={<div>Loading remote_sb error</div>}>
        <List columns={columns} />
      </Suspense>
    </div>
  );
};

export default App;
