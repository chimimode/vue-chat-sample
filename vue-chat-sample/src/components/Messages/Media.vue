<template>
  <div class="box">
    <p class="subtitle">media</p>
    <iframe
      width="250px"
      height="100%"
      :src="talk.text"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
  export default {
    name: 'message-media',
    props: {
      talk: {},
    },
  };
</script>
