<template>
  <div>
    <div v-html="compiledMarkdown"></div>
    <b-button @click="copy">Copy</b-button>
  </div>
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
  methods: {
    copy() {
      this.$clipboard(this.content);
    }
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.content, {
        mangle: true,
        smartLists: true,
        smartypants: true,
        gfm: true,
        breaks: true
      });
    }
  }
};
</script>

<style scoped>
div {
  margin: 1rem 2rem;
  padding: 2rem;
  text-align: left;
  line-height: 30px;
  border: 2px solid #efefef;
}
</style>
