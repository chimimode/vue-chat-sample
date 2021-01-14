<template>
  <div class="box">
    <p class="subtitle">{{ talk.type }}</p>
    <img :src="talk.text" />
  </div>
</template>

<script>
  export default {
    name: 'message-image',
    props: {
      talk: {},
    },
  };
</script>
