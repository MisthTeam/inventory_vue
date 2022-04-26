import "bootstrap";
import "@/assets/bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue";
import Toast from "vue-toastification";
import { createPinia } from "pinia";
import App from "./App.vue";
import components from "@/components/UI";
import router from "./router";

import "vue-toastification/dist/index.css";

const app = createApp(App);

components.forEach((element) => {
  app.component(element.name, element);
});

app.use(createPinia());
app.use(router);
app.use(Toast, {});

app.mount("#app");
