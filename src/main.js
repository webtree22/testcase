import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { firestorePlugin } from "vuefire";
import { auth } from "./firebase";
Vue.config.productionTip = false;

Vue.use(firestorePlugin);

let app;

auth.onAuthStateChanged(user => {
  console.log("user", user?.uid);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
