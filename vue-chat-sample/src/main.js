import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/routes/index'
import store from './store/index'

// const app = createApp(App);
// app.use(router);
// app.use(store);
// app.mount('#app');

createApp(App).use(router).use(store).mount('#app')
