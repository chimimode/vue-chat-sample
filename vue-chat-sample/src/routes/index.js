import {createRouter, createWebHistory} from 'vue-router'
import List from '../components/List.vue';
import Chat from '../components/Chat.vue';
import Setting from '../components/Setting.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: List,
      name: 'main'
    },
    {
      path: '/chat',
      component: Chat,
      name: 'chat'
    },
    {
      path: '/setting',
      component: Setting,
      name: 'setting'
    }
  ]
});

export default router;