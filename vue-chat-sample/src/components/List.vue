<template>
  <router-link to="/chat?type=faq" class="button is-rounded">FAQ</router-link>
  <router-link to="/chat?type=mobile" class="button is-rounded">모바일</router-link>
  <router-link to="/chat?type=pc" class="button is-rounded">PC</router-link>
</template>

<script>
  export default {
    name: 'List',
    props: {},
  };
</script>

<style scoped>
  .button {
    margin-right: 0.5rem;
  }
</style>
