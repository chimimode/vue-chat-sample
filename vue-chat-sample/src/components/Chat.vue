<template>
  <body>
    <section class="section">
      <div class="container">
        <div class="card">
          <div v-if="settingData">
            <div v-if="settingData[0].isNoticeOpen" class="notification is-warning is-light">
              <strong>notice</strong>
            </div>
          </div>

          <header class="card-header">
            <p class="card-header-title">Channel - {{ channelId }}</p>
            <div class="card-header-icon">
              <router-link to="/" class="delete"></router-link>
            </div>
          </header>

          <message-text :talk="messageList" @message="(text) => clientMessage(text)" />
          <span v-show="isLoading" class="button is-loading">입력 중..</span>

          <footer class="card-footer">
            <input class="input" type="text" @keyup.enter="clientMessage()" v-model="message" placeholder="message" />
            <button @click="clientMessage()" class="button is-primary">
              전송
            </button>
          </footer>
        </div>
      </div>
    </section>
  </body>
</template>

<script>
  import io from 'socket.io-client';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import MessageText from './Message';
  import { TEST_GLOBAL } from '../common/global';

  let store, route;

  const socket = io('http://ec2-18-218-136-128.us-east-2.compute.amazonaws.com:3000/', {
    withCredentials: true,
  });

  export default {
    name: 'chat',
    components: { MessageText },
    data() {
      return {
        Global: {},
        timer: null,
        settingData: null,
        socketId: '',
        channelId: '',
        messageList: [],
        message: '',
        isLoading: false,
      };
    },
    created() {
      this.Global = TEST_GLOBAL;
      this.settingData = JSON.parse(localStorage.getItem(this.Global.STORAGE.KEY));

      route = useRoute();
      store = useStore();

      const dataFetch = this.getQuestions();

      dataFetch.then(() => {
        this.isLoading = true;

        this.clearTimer();

        setTimeout(() => {
          this.serverMessage();
          this.isLoading = false;
        }, 1000);
      });

      this.channelId = route.query.type;

      socket.on('connect', () => {
        this.socketId = socket.id;
        store.dispatch('setSocketId', socket.id);
      });
    },

    mounted() {
      if (localStorage.name) {
        this.settingData.name = localStorage.name;
      }
      if (localStorage.age) {
        this.settingData.age = localStorage.age;
      }
    },

    methods: {
      clearTimer() {
        if (this.timer) {
          clearTimeout(this.timer);
        }
      },
      serverMessage() {
        this.isLoading = true;

        this.messageList.push({
          isAuth: true,
          message: `${route.query.type} 메시지 선택`,
          questions: store.getters.getQuestionsByType(route.query.type) || [],
        });

        this.isLoading = false;
      },

      clientMessage(text) {
        if (this.message.length > 0 || text) {
          this.isLoading = true;
          let message = this.message || text;

          socket.emit('chat message', { isAuth: false, message: message });
          this.messageList.push({ isAuth: false, message: message });

          this.message = '';

          this.clearTimer();
          setTimeout(() => {
            this.answerMessage(message);
          }, this.Global.CHAT.TIMER);
        }
      },

      answerMessage(question) {
        this.isLoading = true;

        this.messageList.push({
          isAuth: true,
          message: store.getters.getAnswerByQuestion(route.query.type, question),
          questions: [],
        });

        this.clearTimer();
        setTimeout(() => {
          this.serverMessage();
          this.isLoading = false;
        }, this.Global.CHAT.TIMER);
      },

      getQuestions() {
        //return fetch('http://ec2-18-218-136-128.us-east-2.compute.amazonaws.com:3000/static/questions.json').then(
        return fetch(`${this.Global.API.TEST}static/questions.json`).then((response) => {
          response.json().then((data) => {
            store.dispatch('setQuestions', data.questions);
          });
        });
      },
    },
  };
</script>

<style>
  .section {
    width: 470px;
  }
  .columns {
    display: block !important;
  }
  .subtitle {
    font-size: 1rem;
  }
</style>
