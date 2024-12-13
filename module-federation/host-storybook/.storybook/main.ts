import { StorybookConfig } from "storybook-react-rsbuild";
import { mergeRsbuildConfig } from "@rsbuild/core";
import path from "path";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-onboarding", "@storybook/addon-essentials", "@chromatic-com/storybook", "@storybook/addon-interactions"],
  framework: {
    name: "storybook-react-rsbuild",
    options: {
      builder: {
        rsbuildConfigPath: ".storybook/rsbuild.config.ts",
      },
    },
  },
  async rsbuildFinal(config, { configType }) {
    if (config.tools) {
      if (config.tools.htmlPlugin) {
        // template: 'D:\\demo\\code-depot\\module-federation\\host-storybook\\node_modules\\.pnpm\\storybook-builder-rsbuild@0.1.5_@rsbuild+core@1.1.5_@types+react@18.3.12_esbuild@0.24.0_storybook@8.4.5_typescript@5.7.2\\node_modules\\storybook-builder-rsbuild\\templates\\preview.ejs',
        config.tools.htmlPlugin.template = path.resolve(__dirname, "template/preview.ejs");
      }
    }
    console.log(config, configType);
    return config;
  },
};
export default config;
