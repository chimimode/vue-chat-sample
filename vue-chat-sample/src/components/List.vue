<template>
  <body>
    <section class="section">
      <div class="container">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Channel</p>
          </header>

          <div id="chat" class="card-content">
            <div class="content">
              <router-link to="/chat?type=faq" class="panel-block is-active">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                FAQ
              </router-link>

              <router-link to="/chat?type=mobile" class="panel-block is-active">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                모바일
              </router-link>

              <router-link to="/chat?type=pc" class="panel-block is-active">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                PC
              </router-link>
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
  .panel-block {
    height: 100px;
  }
</style>
