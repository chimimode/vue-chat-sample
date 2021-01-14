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
                <p class="subtitle">{{ message.message }}</p>
                <div v-if="message.isAuth" class="field is-grouped is-grouped-multiline">
                  <p v-for="question in message.questions" :key="question" class="control">
                    <a @click="clientMessage(question.question)" class="button is-primary is-outlined">
                      {{ question.question }}
                    </a>
                  </p>
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
  export default {
    name: 'message-text',
    emits: {
      message: null,
    },
    props: {
      talk: { type: Array, default: () => [] },
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
  .section {
    width: 470px;
  }
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
