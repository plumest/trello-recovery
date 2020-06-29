<template>
  <div v-html="compiledMarkdown"></div>
</template>

<script>
import axios from "axios";
import marked from "marked";

export default {
  name: "Content",
  props: {
    url: String,
    apiKey: String,
    token: String
  },
  data() {
    return {
      content: ""
    };
  },
  mounted() {
    axios
      .get(`${this.url}&key=${this.apiKey}&token=${this.token}`)
      .then(res => (this.content = res.data[0].data.old.desc))
      .catch(e => console.log(e));
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.content, { sanitize: true });
    }
  }
};
</script>

<style scoped>
div {
  margin-top: 2rem;
}
</style>
