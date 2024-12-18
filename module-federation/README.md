## Remote App

### 项目示意图

- [x] host-demo-react:2000
  - [x] remote-react-rsbuild: 2001
  - [x] remote-react-vite: 2002
- [x] host-demo-vue:3000
  - [x] remote-vue-vite: 3001
- [x] host-storybook:6006
  - [x] remote-react-rsbuild: 2001
  - [x] remote-react-vite: 2002

### TODO LIST

- [ ] remote + sb host
  - [x] 基于 rsbuild、vite 的 remote 可被集成
  - [x] preview 获取配置
  - [ ] sb addon
- [x] vue2react
- [x] runtime
  - [x] runtime bridge 问题
- [x] demo 演示
  - [x] 集成 runtime
  - [x] 集成 runtime + bridge

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
pnpm add @module-federation/bridge-react@latest
```

### 踩坑记录

#### host 加载 vite

https://github.com/vitejs/vite/issues/12876

#### rslib 打包不存在依赖库

https://lib.rsbuild.dev/guide/advanced/third-party-deps#default-handling-of-third-party-dependencies
