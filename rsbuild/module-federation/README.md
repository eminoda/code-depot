基于 Rsbuild 的 Module Federation 示例

参考：https://github.com/keelz/module-federation-rsbuild-remote-one

注意点：

1. 这里使用 Module Federation 2.0，rsbuild 中使用：@module-federation/enhanced/rspack

## Module Federation 项目结构

- Host: rsbuild-host（react）
  - Remote1: rsbuild-remote-one（react）
  - Remote2: rsbuild-remote-two（vue）
  - Remote3: rsbuild-remote-storybook（storybook+amis）

## 文档

[storybook cli](https://storybook.js.org/docs/api/cli-options#dev)
[storybook-react-rsbuild](https://storybook-rsbuild.netlify.app/guide/)