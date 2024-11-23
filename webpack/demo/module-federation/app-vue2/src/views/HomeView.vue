<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!-- <RemoteApp /> -->
    <!-- <ComponentA /> -->
    <ComponentB />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ReactComponent from "@/components/ReactComponent.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    // ComponentA: () => import("ComponentA/App"),
    ComponentB: ReactComponent,
  },
  mounted() {},
};
</script>
