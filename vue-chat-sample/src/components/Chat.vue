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
                <div class="column">
                  <div class="box">
                    <p class="title is-5">Flexible column</p>
                    <p class="subtitle">This column will take up the remaining space available.</p>
                    <div class="field is-grouped is-grouped-multiline">
                      <p class="control">
                        <a class="button is-primary is-outlined">
                          One
                        </a>
                      </p>
                      <p class="control">
                        <a class="button is-primary is-outlined">
                          Two
                        </a>
                      </p>
                      <p class="control">
                        <a class="button is-primary is-outlined">
                          Three
                        </a>
                      </p>
                      <p class="control">
                        <a class="button is-primary is-outlined">
                          Four
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div v-for="msg in list" v-bind:key="msg">
                  <div class="column is-narrow" :class="{ mymessage: !msg.isAuth }">
                    <div class="box" style="width: 250px;">
                      <p v-if="msg.isAuth" class="title is-5">admin</p>
                      <p class="subtitle">{{ msg.message }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <input class="input" type="text" @keyup.enter="sendMessage()" v-model="message" placeholder="message" />
            <button @click="sendMessage()" class="button is-primary">
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

  const socket = io('http://localhost:3000/', {
    withCredentials: true,
  });

  export default {
    name: 'chat',
    props: {},
    data() {
      return {
        // socketId: '',
        list: [],
      };
    },
    created() {
      console.log('created');

      socket.on('connect', () => {
        console.log(socket.id);
        this.socketId = socket.id;

        //chatData.commit('setId', socket.id);
      });

      socket.on('chat message', (message) => {
        console.log(message);
      });
    },
    updated() {
      console.log('updated');
      this.$el.querySelector('#chat').scrollTop = this.$el.querySelector('#chat').scrollHeight;
    },
    mounted() {
      console.log('mounted');
    },
    setup() {
      const store = useStore();
      const getSocketId = () => {
        return store.state.socketId;
      };
      const setSocketId = () => {
        store.dispatch('', socket.id);
      };
      return {
        getSocketId,
        setSocketId,
      };
    },
    methods: {
      sendMessage() {
        if (this.message.length > 0) {
          socket.emit('chat message', this.message);
          this.list.push({ isAuth: false, message: this.message });

          this.message = '';
        }
      },
    },
  };
</script>

<style>
  .section {
    width: 470px;
  }
  .message {
    max-width: 60%;
  }
  .card-content {
    height: 500px;
    overflow-y: scroll;
  }
  .colum {
    display: inline-block;
  }
  .mymessage {
    float: right;
  }
  .mymessage .box {
    background-color: hsl(204, 71%, 73%);
  }
</style>
