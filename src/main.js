import "@/assets/bootstrap/dist/css/bootstrap.css";
import components from "@/components/UI";
import directives from "@/directives";
import "bootstrap";
import { createPinia } from "pinia";
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

components.forEach((element) => {
  app.component(element.name, element);
});

directives.forEach((dir) => {
  app.directive(dir.name, dir);
});

app.use(createPinia());
app.use(router);
app.use(Toast, {});

app.mount("#app");
