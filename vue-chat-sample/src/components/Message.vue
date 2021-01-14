<template>
  <div id="chat" class="card-content">
    <div class="content">
      <div class="columns">
        <div id="test" v-for="message in talk" :key="message">
          <div class="column" :class="{ mymessage: !message.isAuth }">
            <div class="box">
              <p v-if="message.isAuth" class="title is-5">Admin</p>
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
</template>

<script>
  export default {
    name: 'talk',
    emits: {
      message: null,
    },
    props: {
      talk: { type: Array, default: () => [] },
    },
    updated() {
      console.log('updated');
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
  }
  .colum {
    display: inline-block;
  }
  .mymessage .box {
    background-color: hsl(171, 100%, 41%);
    width: 70%;
  }
</style>
