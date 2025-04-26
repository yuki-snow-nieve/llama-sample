import { createApp } from 'vue'

import 'destyle.css'
import './assets/main.css'
import './style.scss';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

app.config.errorHandler = (err) => {
  /* エラーの制御 */
};
