import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ContextMenu from '@imengyu/vue3-context-menu';
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(Vue3Toastify, {
  theme: 'dark',
  position: 'bottom-right',
  autoClose: 3000,
});
app.use(ContextMenu);

app.mount('#app');
