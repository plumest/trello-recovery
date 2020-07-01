<template>
  <div id="app">
    <h1>Trello Recovery</h1>
    <RecoveryForm
      @submitted="onSubmit"
      :secretKey="secretKey"
      :secretToken="secretToken"
      :db="db"
      :canEdit="!secretKey && !secretToken"
    />
    <Content
      v-if="url"
      :url="url"
      :secretKey="secretKey"
      :secretToken="secretToken"
    />
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
      db: null,
      url: "",
      secretKey: "",
      secretToken: ""
    };
  },
  async created() {
    this.db = await this.getDb();
    let { secretKey, secretToken } = await this.getSecretFromDb();
    this.secretKey = secretKey;
    this.secretToken = secretToken;
  },
  methods: {
    onSubmit(data) {
      this.url = data.url;
      this.secretKey = data.secretKey;
      this.secretToken = data.secretToken;
    },

    async getDb() {
      return new Promise((resolve, reject) => {
        let request = window.indexedDB.open(process.env.VUE_APP_DB_NAME);

        request.onerror = e => {
          console.log("Error opening db", e);
          reject("Error");
        };

        request.onsuccess = e => {
          console.log(e.target.result);
          resolve(e.target.result);
        };

        request.onupgradeneeded = e => {
          console.log("onupgradeneeded");
          let db = e.target.result;
          db.createObjectStore("secret", {
            autoIncrement: true,
            keyPath: "id"
          });
        };
      });
    },

    async getSecretFromDb() {
      return new Promise(resolve => {
        let trans = this.db.transaction(["secret"], "readonly");
        trans.oncomplete = () => {
          console.log(secret);
          resolve(secret);
        };

        let store = trans.objectStore("secret");
        let secret = {};

        store.openCursor().onsuccess = e => {
          let cursor = e.target.result;
          if (cursor) {
            secret = cursor.value;
            cursor.continue();
          }
        };
      });
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
