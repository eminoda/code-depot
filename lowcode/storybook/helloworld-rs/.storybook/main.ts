// import type { StorybookConfig } from "@storybook/react-vite";
import { StorybookConfig } from 'storybook-react-rsbuild'

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    // name: "@storybook/react-vite",
    name: "storybook-react-rsbuild",
    options: {},
  },
};
export default config;
