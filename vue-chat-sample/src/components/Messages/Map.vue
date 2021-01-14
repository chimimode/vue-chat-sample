<template>
  <div class="box">
    <p class="subtitle">map</p>
    <iframe
      :src="talk.text"
      width="250px"
      height="100%"
      frameborder="0"
      style="border:0;"
      allowfullscreen=""
      aria-hidden="false"
      tabindex="0"
    ></iframe>
  </div>
</template>

<script>
  export default {
    name: 'message-map',
    props: {
      talk: {},
    },
  };
</script>
