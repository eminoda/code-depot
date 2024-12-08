import React from "react";
import ReactDOM from "react-dom";

import type { Preview } from "@storybook/react";
import { useEffect, useGlobals } from "storybook/internal/preview-api";
import type { Renderer, StoryContext, PartialStoryFn as StoryFunction } from "storybook/internal/types";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

init({
  name: "sb_host",
  remotes: [
    {
      name: "mf_remote_one",
      entry: "http://localhost:2001/mf-manifest.json",
    },
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
});

const preview: Preview = {
  decorators: [
    (Story, context) => {
      console.log("context", context);
      return (
        <div>
          <div>
            <ul>
              <li>ComponentId：{context.componentId}</li>
              <li>Title:{context.title}</li>
              <li>SchemaJSON：{JSON.stringify(context.args)}</li>
            </ul>
          </div>
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
