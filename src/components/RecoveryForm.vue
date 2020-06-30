<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group label="Recovery type">
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
      <b-form-group label="Key & Token">
        <a href="https://trello.com/app-key" target="_blank"
          >You can get them here</a
        >
        <b-form-input
          class="textForm"
          v-model="apiKey"
          placeholder="Enter the API key"
        />
        <b-form-input
          class="textForm"
          v-model="apiToken"
          placeholder="Enter the API token"
        />
      </b-form-group>

      <b-button type="submit" variant="primary">Recovery</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: "",
      cardId: "",
      apiKey: "",
      apiToken: "",
      recoveryUrl: "",
      isLastChange: true,
      options: [
        { text: "Last Change", value: true },
        { text: "All Change", value: false }
      ]
    };
  },
  methods: {
    onSubmit(e) {
      // https://trello.com/c/CSV6GpER/27-%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%87%E0%B8%B2%E0%B8%99-call-for-speaker
      e.preventDefault();
      // this.cardId = this.link.replace("https://trello.com/c/", "");
      this.cardId = this.link.slice(21, 29);
      let data = {
        url: `https://trello.com/1/cards/${this.cardId}/actions?filter=updateCard:desc`,
        key: this.apiKey,
        token: this.apiToken
      };
      this.$emit("submitted", data);
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
