<template>
  <div id="chat" class="card-content">
    <div class="content">
      <div class="columns">
        <div v-for="message in talk" :key="message">
          <div class="column">
            <div class="media" :class="{ mymessage: !message.isAuth }">
              <div v-if="message.isAuth" class="media-left">
                <div class="image is-48x48">
                  <img class="is-rounded" src="https://bulma.io/images/placeholders/48x48.png" />
                </div>
                <div class="media-content">
                  Admin
                </div>
              </div>

              <div class="box">
                <p v-if="message.isAuth" class="subtitle">
                  {{ message.message.type === 'text' ? message.message.text : '' }}
                </p>
                <p v-else class="subtitle">{{ message.message }}</p>

                <message-image :talk="message.message" v-if="message.message.type === 'image'" />
                <message-map :talk="message.message" v-if="message.message.type === 'map'" />
                <message-media :talk="message.message" v-if="message.message.type === 'media'" />

                <div v-if="message.isAuth" class="field is-grouped is-grouped-multiline">
                  <p v-for="question in message.questions" :key="question" class="control">
                    <a @click="clientMessage(question.question)" class="button is-primary is-outlined">
                      {{ question.question }}
                    </a>
                  </p>
                </div>
              </div>

              <div v-if="!message.isAuth && settingData" class="media-right">
                <div class="image is-48x48">
                  <img class="is-rounded" src="https://bulma.io/images/placeholders/48x48.png" />
                </div>
                <div class="media-content">
                  <span></span>
                  {{ settingData[0].userNickname }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { TEST_GLOBAL } from '../common/global';
  import MessageImage from './Messages/Image';
  import MessageMap from './Messages/Map';
  import MessageMedia from './Messages/Media';

  export default {
    name: 'message-text',
    data() {
      return {
        global: {},
        settingData: null,
      };
    },
    components: { MessageImage, MessageMap, MessageMedia },
    emits: {
      message: null,
    },
    props: {
      talk: { type: Array, default: () => [] },
    },
    created() {
      this.global = TEST_GLOBAL;
      this.settingData = JSON.parse(localStorage.getItem(this.global.STORAGE.KEY));
    },
    updated() {
      this.$el.scrollTop = this.$el.scrollHeight;
    },
    methods: {
      clientMessage(question) {
        this.$emit('message', `${question}`);
      },
    },
  };
</script>

<style>
  .card-content {
    height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
  .column {
    display: flow-root;
  }
  .mymessage {
    float: right;
  }
  .mymessage .box {
    background-color: hsl(171, 100%, 41%);
    position: relative;
  }
</style>
