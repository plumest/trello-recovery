<template>
  <div id="app">
    <h1>Trello Recovery</h1>
    <RecoveryForm @submitted="onSubmit" />
    <Content v-if="url" :url="url" :apiKey="apiKey" :token="token" />
  </div>
</template>

<script>
import RecoveryForm from "./components/RecoveryForm.vue";
import Content from "./components/Content";

export default {
  name: "App",
  components: {
    RecoveryForm,
    Content
  },
  data() {
    return {
      url: "",
      apiKey: process.env.VUE_APP_KEY,
      token: process.env.VUE_APP_TOKEN
    };
  },
  methods: {
    onSubmit(data) {
      this.url = data.url;
      this.apiKey = data.key;
      this.token = data.token;
    }
  }
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
