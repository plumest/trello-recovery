import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import Clipboard from "v-clipboard";
import {
  BootstrapVue,
  IconsPlugin,
  BFormRadioGroup,
  // FormRadioPlugin,
  BFormGroup,
  // FormGroupPlugin,
  BFormInput
  // FormInputPlugin
} from "bootstrap-vue";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(Clipboard);

Vue.component("b-form-radio-group", BFormRadioGroup);
Vue.component("b-form-group", BFormGroup);
Vue.component("b-form-input", BFormInput);

// Vue.use(FormRadioPlugin);
// Vue.use(FormGroupPlugin);
// Vue.use(FormInputPlugin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
