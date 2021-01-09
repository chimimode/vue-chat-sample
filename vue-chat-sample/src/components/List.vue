<template>
  <body>
    <section class="section">
      <div class="container">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Component
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>

          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="column is-narrow">
                  <div class="box" style="width: 200px;">
                    <p class="title is-5">Narrow column</p>
                    <p class="subtitle">This column is only 200px wide.</p>
                  </div>
                </div>
                <div class="column">
                  <div class="box">
                    <p class="title is-5">Flexible column</p>
                    <p class="subtitle">This column will take up the remaining space available.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-grouped is-grouped-multiline">
              <p class="control">
                <a class="button">
                  One
                </a>
              </p>
              <p class="control">
                <a class="button">
                  Two
                </a>
              </p>
              <p class="control">
                <a class="button">
                  Three
                </a>
              </p>
              <p class="control">
                <a class="button">
                  Four
                </a>
              </p>
            </div>
          </div>
          <footer class="card-footer">
            <input class="input" type="text" placeholder="message" />
            <a class="button is-primary">
              Submit
            </a>
          </footer>
        </div>
      </div>
    </section>
  </body>
</template>

<style>
  .message {
    max-width: 70%;
  }
</style>
