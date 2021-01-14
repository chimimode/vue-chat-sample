<template>
  <body>
    <section class="section">
      <div class="container">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Channel - {{ channelId }}</p>
            <div class="card-header-icon">
              <router-link to="/" class="delete"></router-link>
            </div>
          </header>

          <message-text :talk="messageList" @message="(text) => clientMessage(text)" />

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

  //let store = useStore();
  //let route = useRoute();

  let store, route;

  const socket = io('http://localhost:3000/', {
    withCredentials: true,
  });

  export default {
    name: 'chat',
    components: { MessageText },
    data() {
      return {
        socketId: '',
        channelId: '',
        messageList: [],
        message: '',
      };
    },
    created() {
      console.log('created');
      route = useRoute();
      store = useStore();

      let dataFetch = this.getQuestions();

      dataFetch.then(() => {
        console.log('ok');
        this.serverMessage();
      });

      console.log(dataFetch);

      this.channelId = route.query.type;

      socket.on('connect', () => {
        //console.log(socket.id);
        this.socketId = socket.id;
        store.dispatch('setSocketId', socket.id);
      });

      socket.on('chat message', () => {
        //
      });
    },
    mounted() {
      console.log('mounted');
    },
    updated() {},
    methods: {
      serverMessage() {
        console.log('serverMessage');
        this.messageList.push({
          isAuth: true,
          message: `${route.query.type} 메시지 선택`,
          questions: store.getters.getQuestionsByType(route.query.type) || [],
        });
      },

      clientMessage(text) {
        if (this.message.length > 0 || text) {
          let message = this.message || text;

          socket.emit('chat message', { isAuth: false, message: message });
          this.messageList.push({ isAuth: false, message: message });

          this.message = '';

          this.answerMessage(message);
        }
      },

      answerMessage(question) {
        this.messageList.push({
          isAuth: true,
          message: store.getters.getAnswerByQuestion(route.query.type, question),
          questions: [],
        });

        this.serverMessage();
      },

      getQuestions() {
        return fetch('http://localhost:3000/static/questions.json').then((response) => {
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
