# 测试通过自制 runtime

 module federation React 找不：Cannot read properties of null (reading 'useRef'

## 步骤

### mf 原生 runtime 集成
1. host 集成 mf runtime：https://module-federation.io/guide/basic/runtime.html
2. remote 打包 remote 套件
3. 测试是否 ok？ --- ok



## 问题

### error TS2688: Cannot find type definition file for 'node'.
```
error TS2688: Cannot find type definition file for 'node'.
  The file is in the program because:
    Entry point for implicit type library 'node'
```

```json
"typeRoots": ["node_modules/@types"]
```

### shared 不会减少最终 dist 的体积，只在 runtime 加载策略时选择加载

```
  File (web)                                                                               Size        Gzip
  ..\mf-host\public\mf_remote_one\static\css\async\__federation_expose_App.00489517.css    0.33 kB     0.24 kB
  ..\mf-host\public\mf_remote_one\static\js\async\__federation_expose_App.acb18ce8.js      0.75 kB     0.48 kB  
  ..\mf-host\public\mf_remote_one\static\js\mf_remote_one.6a416aa3.js                      80.9 kB     24.0 kB  
```

```
shared: ["react", "react-dom"],
```

注意：依赖还是会打包出去的，供满足条件后加载

```
  File (web)                                                                               Size        Gzip    
  ..\mf-host\public\mf_remote_one\static\css\async\__federation_expose_App.00489517.css    0.33 kB     0.24 kB
  ..\mf-host\public\mf_remote_one\static\js\async\__federation_expose_App.acb18ce8.js      0.75 kB     0.48 kB
  ..\mf-host\public\mf_remote_one\static\js\mf_remote_one.e20adf37.js                      81.0 kB     24.3 kB
```

### 不同 React 集成报错

```
Uncaught Error: Objects are not valid as a React child (found: object with keys {$$typeof, type, key, ref, props}). If you meant to render a collection of children, use an array instead.

```

版本问题，host 和 remote react 跨版本：比如一个 18.3，一个 19.0
pnpm 版本错乱

### 什么时候 remote 主动加载

singleton 为 true 时，会无视 host 版本，直接加载 remote requiredVersion

> [ Federation Runtime ] Warn Version 18.2.0 from mf_host of shared singleton module react does not satisfy the requirement of mf_host which needs 18.3.0)

```
  shared: {
    // 如果 host version < remote requiredVersion 会提示。并且加载 remote version
    react: {
      version: "18.2.0",
      lib: () => React,
      shareConfig: {  requiredVersion: "18.3.0" },
    },
  },
```


> [ Federation Runtime ] Warn Version 18.3.1 from mf_host of shared singleton module react does not satisfy the requirement of mf_remote_one which needs 19.0.0)

host 实际提供 version: 18.3.1
remote 限制 requiredVersion：19.0.0，自身 version：18.3.1，且为单例

使用 host 共享模块，remote 不在加载。





| host                           | remote                                                       | shared 加载情况 | 分析                                                                 |
| ------------------------------ | ------------------------------------------------------------ | --------------- | -------------------------------------------------------------------- |
| { version: 19.0.0 }            | { version: 18.3.1 }                                          | host + remote   | 版本不同，各用各的                                                   |
| { version: 18.3.1 }            | { version: 18.3.1 }                                          | host + remote   | 版本相同，各用各的                                                   |
| { version: 19.0.0,lib:()=>{} } | { version: 18.3.1 }                                          | 共用 host       | host 提供共享模块，remote 没有限制，随 host 版本                     |
| { version: 19.0.0,lib:()=>{} } | { version: 18.3.1 }                                          | 共用 host       | host 提供共享模块，remote 没有限制，随 host 版本                     |
| { version: 18.3.1,lib:()=>{} } | { version: 18.3.1 ,requiredVersion:19.0.0 }                  | host + remote   | host 提供共享模块，但和 remote 限制不匹配，各用各的                  |
| { version: 19.0.0,lib:()=>{} } | { version: 18.3.1 ,requiredVersion:19.0.0 }                  | 共用 host       | host 提供共享模块，和 remote 匹配，随 host 版本                      |
| { version: 19.0.1,lib:()=>{} } | { version: 18.3.1 ,requiredVersion:^19.0.0 }                 | 共用 host       | host 提供共享模块，和 remote 匹配，随 host 版本                      |
| { version: 22.0.0,lib:()=>{} } | { version: 18.3.1 ,requiredVersion:^19.0.0 }                 | host + remote   | host 提供共享模块，但和 remote 限制不匹配，各用各的                  |
| { version: 22.0.0,lib:()=>{} } | { version: 18.3.1 ,requiredVersion:^19.0.0,singletion:true } | 共用 host       | host 提供共享模块，虽然和 remote 限制不匹配，但随 host，给出 warning |
| { version: 18.0.0,lib:()=>{} } | { version: 18.3.1 ,requiredVersion:^19.0.0,singletion:true } | 共用 host       | host 提供共享模块，虽然和 remote 限制不匹配，但随 host，给出 warning |

