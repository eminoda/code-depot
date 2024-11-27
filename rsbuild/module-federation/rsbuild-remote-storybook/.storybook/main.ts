import { StorybookConfig } from "storybook-react-rsbuild";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-onboarding", "@storybook/addon-essentials", "@chromatic-com/storybook", "@storybook/addon-interactions"],
  framework: {
    name: "storybook-react-rsbuild",
    options: {
      builder: {
        rsbuildConfigPath: "./rsbuild.sb.config.ts",
      },
    },
  },
  rsbuildFinal(config, { configType }) {
    return config;
  },
};
export default config;
