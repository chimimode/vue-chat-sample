<template>
  <body>
    <section class="section">
      <div class="container">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Component - {{ socketId }}</p>
            <div class="card-header-icon">
              <router-link to="/" class="delete"></router-link>
            </div>
          </header>

          <div id="chat" class="card-content">
            <div class="content">
              <div class="columns">
                <div v-for="msg in talk" :key="msg">
                  <div class="column is-narrow" :class="{ mymessage: !msg.isAuth }">
                    <div class="box" style="width: 250px;">
                      <p v-if="msg.isAuth" class="title is-5">admin</p>
                      <p class="subtitle">{{ msg.message }}</p>
                    </div>
                  </div>
                </div>

                <talk :talk="messageList" @message="(text) => clientMessage(text)" />
              </div>
            </div>
          </div>
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
  //import { ref, onMounted, onUpdated } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import Talk from './Message';

  //let store = useStore();
  //let route = useRoute();

  let store, route;

  const socket = io('http://localhost:3000/', {
    withCredentials: true,
  });

  export default {
    name: 'chat',
    components: { Talk },
    data() {
      return {
        socketId: '',
        questions: {},
        talk: [],
        messageList: [],
        message: '',
        questionsData: [],
      };
    },
    created() {
      route = useRoute();
      store = useStore();

      this.getQuestions();
      this.serverMessage();
      console.log('created');

      socket.on('connect', () => {
        //console.log(socket.id);
        //this.socketId = socket.id;
      });

      socket.on('chat message', () => {
        //
      });
    },
    mounted() {
      console.log('mounted');
    },
    updated() {
      console.log('updated');
      this.$el.querySelector('#chat').scrollTop = this.$el.querySelector('#chat').scrollHeight;
    },
    methods: {
      serverMessage() {
        this.messageList.push({
          isAuth: true,
          message: route.query.type,
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
        //this.$nextTick(function() {
        //  console.log('??'); // => '갱신됨'
        //});
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
            this.questionsData = data.questions;
            //loading.value = false;
            store.dispatch('setQuestions', this.questionsData);
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
  .card-content {
    height: 500px;
    overflow-y: scroll;
  }
  .columns {
    display: block !important;
  }
  .subtitle {
    font-size: 1rem;
  }
</style>
