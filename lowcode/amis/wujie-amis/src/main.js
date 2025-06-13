import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

if (window.__POWERED_BY_WUJIE__) {
  let instance;
  window.__WUJIE_MOUNT = () => {
    instance = new Vue({
      render: (h) => h(App),
    }).$mount("#app");
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.$destroy();
  };
} else {
  new Vue({
    render: (h) => h(App),
  }).$mount("#app");
}
