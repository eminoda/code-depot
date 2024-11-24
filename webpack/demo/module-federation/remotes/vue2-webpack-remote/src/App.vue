<template>
  <div>
    <h2>vue2-webpack-remote</h2>
    <button @click="() => (count = count + 1)">count</button> <span>{{ count }}</span>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      count: 0,
    };
  },
};
</script>

<style></style>
