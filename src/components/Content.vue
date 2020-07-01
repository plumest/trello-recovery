<template>
  <div v-if="!isLoading" class="mb-3">
    <div v-if="isValid">
      <div v-html="compiledMarkdown" class="content"></div>
      <b-button @click="copy" variant="primary">Copy</b-button>
    </div>
    <p v-else class="text-danger">Please Enter the valid Url, Key & Token</p>
  </div>
</template>

<script>
import axios from "axios";
import marked from "marked";

export default {
  name: "Content",
  props: {
    url: String,
    secretKey: String,
    secretToken: String
  },
  data() {
    return {
      content: "",
      isValid: false,
      isLoading: true
    };
  },
  mounted() {
    axios
      .get(`${this.url}&key=${this.secretKey}&token=${this.secretToken}`)
      .then(res => (this.content = res.data[0].data.old.desc))
      .then(() => (this.isValid = true))
      .catch(e => console.log(e))
      .finally(() => (this.isLoading = false));
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
.content {
  margin: 1rem 2rem;
  padding: 2rem;
  text-align: left;
  line-height: 30px;
  border: 2px solid #efefef;
}
</style>
