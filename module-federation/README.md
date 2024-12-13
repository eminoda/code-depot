## Remote App

### 项目示意图

- [x] host-demo-react:2000
  - [x] remote-react-rsbuild: 2001
  - [x] remote-react-vite: 2002
- [x] host-demo-vue:3000
  - [x] remote-vue-vite: 3001
- [x] host-storybook:6006
  - [x] remote-react-rsbuild: 2001

### 构建脚本

创建 rsbuild mf 项目

```shell
# rsbuild react
pnpm create rsbuild@latest
# ui
pnpm install antd --save
# mf
pnpm add @module-federation/rsbuild-plugin --save-dev
```

创建 vite mf 项目

```shell
# vite react
pnpm create vite
pnpm i ant-design-vue@4.x -S
pnpm add @module-federation/vite --save
```

创建 mf runtime 项目

```shell
# rslib
pnpm create rslib@latest
# runtime
pnpm add @module-federation/enhanced --save
```

https://github.com/vitejs/vite/issues/12876
