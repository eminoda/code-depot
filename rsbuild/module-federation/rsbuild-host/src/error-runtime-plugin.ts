import type { FederationRuntimePlugin } from "@module-federation/enhanced/runtime";

const runtimePlugin: () => FederationRuntimePlugin = function () {
  return {
    name: "error-runtime-plugin",
    beforeInit(args) {
      console.log("beforeInit: ", args);
      return args;
    },
    init(args) {
      console.log("init: ", args);
      return args;
    },
    beforeRequest(args) {
      console.log("beforeRequest: ", args);
      return args;
    },
    afterResolve(args) {
      console.log("afterResolve", args);
      return args;
    },
    onLoad(args) {
      console.log("onLoad: ", args);
      return args;
    },
    async loadShare(args) {
      console.log("loadShare:", args);
    },
    async beforeLoadShare(args) {
      console.log("beforeloadShare:", args);
      return args;
    },
    async errorLoadRemote(args) {
      console.log("11111111111111");
      return args;
    },
  };
};
export default runtimePlugin;
