import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import ToteaForm from "../../src";

Vue.use(ElementUI);
Vue.use(ToteaForm, {
  baseUrl: "http://localhost:3000",
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
