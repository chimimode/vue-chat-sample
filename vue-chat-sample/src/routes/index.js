import {createRouter, createWebHistory} from 'vue-router'
import main from '../components/HelloWorld.vue';
import Chat from '../components/Chat.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: main,
      name: 'main'
    },
    {
      path: '/chat',
      component: Chat,
      name: 'chat'
    }
  ]
});

export default router;