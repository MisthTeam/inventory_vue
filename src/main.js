import 'bootstrap';
import '@/assets/bootstrap/dist/css/bootstrap.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue';
import router from './router';

createApp(App)
    .use(router)
    .use(createPinia())
    .use(VueAxios, axios)
.mount('#app');
