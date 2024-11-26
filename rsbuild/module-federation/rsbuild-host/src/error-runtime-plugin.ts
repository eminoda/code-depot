import type { FederationRuntimePlugin } from "@module-federation/enhanced/runtime";

const runtimePlugin: () => FederationRuntimePlugin = function () {
  return {
    name: "error-runtime-plugin",
    // beforeInit(args) {
    //   console.log("beforeInit: ", args);
    //   return args;
    // },
    // init(args) {
    //   console.log("init: ", args);
    //   return args;
    // },
    // beforeRequest(args) {
    //   console.log("beforeRequest: ", args);
    //   return args;
    // },
    // afterResolve(args) {
    //   console.log("afterResolve", args);
    //   return args;
    // },
    // onLoad(args) {
    //   console.log("onLoad: ", args);
    //   return args;
    // },
    // async loadShare(args) {
    //   console.log("loadShare:", args);
    // },
    // async beforeLoadShare(args) {
    //   console.log("beforeloadShare:", args);
    //   return args;
    // },
    beforeInit(args) {
      args.userOptions.shareStrategy = "loaded-first";
      return args;
    },
    errorLoadRemote({ id, error, from, origin }) {
      console.error(id, "offline");
      const pg = function () {
        return `remote ${id} is offline due to error: ${error}`;
      };
      if (from === "build") {
        return () => ({
          __esModule: true,
          default: () => `${id} 加载异常`,
        });
      } else {
        return {
          default: pg,
        };
      }
    },
  };
};
export default runtimePlugin;
