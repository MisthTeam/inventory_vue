import components from "@/components/UI";
import "@/assets/bootstrap/dist/css/bootstrap.css";
import directives from "@/directives";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap";
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css"; // Для уведомляшек стили
import "nprogress/nprogress.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

components.forEach((element) => {
  app.component(element.name, element);
});

directives.forEach((dir) => {
  app.directive(dir.name, dir);
});

const toastOpt: PluginOptions = {
  timeout: 1500,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  maxToasts: 3,
};

app.use(createPinia());
app.use(router);
app.use(Toast, toastOpt);

app.mount("#app");
