<template>
  <body>
    <section class="section">
      <div class="container">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Component</p>
          </header>

          <div id="chat" class="card-content">
            <div class="content">
              <div class="">
                <router-link to="/chat?type=faq" class="button is-fullwidth is-rounded">FAQ</router-link>
                <router-link to="/chat?type=mobile" class="button is-fullwidth is-rounded">모바일</router-link>
                <router-link to="/chat?type=pc" class="button is-fullwidth is-rounded">PC</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
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
