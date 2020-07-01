<template>
  <div>
    <b-form @submit="onSubmit">
      <!--  NOTE: Disable for now  -->
      <b-form-group label="Recovery type" v-if="!options">
        <b-form-radio-group
          id="btn-radios"
          v-model="isLastChange"
          :options="options"
          buttons
          button-variant="outline-primary"
          size="sm"
          name="radio-btn-outline"
        />
      </b-form-group>

      <b-form-group label="Card link (Click on the card then copy url)">
        <b-form-input
          class="textForm"
          v-model="link"
          placeholder="Enter the card's url"
          required
        />
      </b-form-group>
      <b-form-group v-if="canEdit" label="Key & Token">
        <a href="https://trello.com/app-key" target="_blank"
          >You can get them here</a
        >
        <b-form-input
          class="textForm"
          v-model="secretKey"
          placeholder="Enter the API key"
          required
        />
        <b-form-input
          class="textForm"
          v-model="secretToken"
          placeholder="Enter the API token"
          required
        />
      </b-form-group>
      <b-button v-else @click="displaySecretForm">Edit Key & Token</b-button>

      <b-button type="submit" variant="primary">Recovery</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    db: Object,
    secretKey: String,
    secretToken: String,
    canEdit: Boolean
  },
  data() {
    return {
      link: "",
      cardId: "",
      // apiKey: "",
      // apiToken: "",
      recoveryUrl: "",
      isLastChange: true,
      options: [
        { text: "Last Change", value: true },
        { text: "All Change", value: false }
      ],
      isShow: false
    };
  },
  methods: {
    displaySecretForm() {
      this.canEdit = true;
    },
    async onSubmit(e) {
      // https://trello.com/c/CSV6GpER/27-%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%87%E0%B8%B2%E0%B8%99-call-for-speaker
      e.preventDefault();
      // this.cardId = this.link.replace("https://trello.com/c/", "");
      this.cardId = this.link.slice(21, 29);
      let data = {
        url: `https://trello.com/1/cards/${this.cardId}/actions?filter=updateCard:desc`,
        secretKey: this.secretKey,
        secretToken: this.secretToken
      };
      let { secretKey, secretToken } = data;
      this.addSecretToDb({ secretKey, secretToken });
      this.$emit("submitted", data);
    },

    async addSecretToDb(secret) {
      return new Promise(resolve => {
        let trans = this.db.transaction(["secret"], "readwrite");
        trans.oncomplete = () => {
          resolve();
        };

        let store = trans.objectStore("secret");
        store.add(secret);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.textForm {
  width: 50%;
  margin: 0 auto;
}
</style>
