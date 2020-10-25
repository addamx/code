<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <HelloWorld msg="Welcome to Your Vue.js App">
      <template slot="test">
        <v-text :text="test" />
      </template>
    </HelloWorld>

  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import VText from "./components/text";

export default {
  name: "App",
  components: {
    HelloWorld,
    VText,
  },
  data() {
    return {
      test: 123123,
    };
  },
  mounted() {
    window.appTest = this;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
