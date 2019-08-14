import Vue from "vue";
import VeeValidate from "vee-validate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

const token = localStorage.getItem("user-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}

Vue.config.productionTip = false;
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
