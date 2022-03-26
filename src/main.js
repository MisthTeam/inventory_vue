import "bootstrap";
import "@/assets/bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import router from "./router";

createApp(App)
    .use(router)
    .use(createPinia())
    .mount("#app");
