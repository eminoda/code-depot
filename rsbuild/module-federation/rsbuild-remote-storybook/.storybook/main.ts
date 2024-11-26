import { StorybookConfig } from "storybook-react-rsbuild";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-onboarding", "@storybook/addon-essentials", "@chromatic-com/storybook", "@storybook/addon-interactions"],
  framework: {
    name: "storybook-react-rsbuild",
    options: {},
  },
  rsbuildFinal(config, { configType }) {
    config.output ??= {}
    config.output.assetPrefix = "http://localhost:2003/abc"
    return config;
  },
};
export default config;
