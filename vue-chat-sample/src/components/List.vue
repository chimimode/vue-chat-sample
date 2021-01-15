<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Channel</p>
          </header>

          <div id="chat" class="card-content">
            <div class="content">
              <router-link to="/chat?type=faq" class="panel-block is-active">
                FAQ
              </router-link>

              <router-link to="/chat?type=mobile" class="panel-block is-active">
                모바일
              </router-link>

              <router-link to="/chat?type=pc" class="panel-block is-active">
                PC
              </router-link>

              <router-link to="/setting" class="panel-block is-active">
                MY INFO
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
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
  .panel-block {
    height: 100px;
  }
</style>
