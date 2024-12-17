import React from "react";
import ReactDOM from "react-dom";

import type { Preview } from "@storybook/react";
import { useEffect, useGlobals } from "storybook/internal/preview-api";
import type { Renderer, StoryContext, PartialStoryFn as StoryFunction } from "storybook/internal/types";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

const options = {
  name: "host_storybook",
  remotes: [
    {
      name: "remote_react_rsbuild",
      entry: "http://localhost:2001/mf-manifest.json",
    },
    // {
    //   name: "remote_react_vite",
    //   entry: "http://localhost:2002/mf-manifest.json",
    // },
  ],
  shared: {
    react: {
      version: "18.3.1",
      lib: () => React,
      // shareConfig: { singleton: true, requiredVersion: "18.5" },
    },
    "react-dom": {
      version: "18.3.1",
      lib: () => ReactDOM,
      // shareConfig: { singleton: true, requiredVersion: "18.5" },
    },
  },
};
// init(options);

const preview: Preview = {
  decorators: [
    (Story, context) => {
      context.hello = 1;
      console.log("context", context);
      return (
        <div>
          {/* {context.title.indexOf("Example") === -1 && (
            <div>
              <ul>
                <li>ComponentId：{context.componentId}</li>
                <li>Title:{context.title}</li>
                <li>SchemaJSON：{JSON.stringify(context.args)}</li>
              </ul>
            </div>
          )} */}
          <Story />
          {/* <RemoteOneApp {...context.args} /> */}
        </div>
      );
    },
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
