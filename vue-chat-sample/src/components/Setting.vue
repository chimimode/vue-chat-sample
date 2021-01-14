<template>
  <body>
    <section class="section">
      <div class="container">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Setting</p>
            <div class="card-header-icon">
              <router-link to="/" class="delete"></router-link>
            </div>
          </header>

          <div id="chat" class="card-content">
            <div class="content">
              <div class="panel-block is-active">
                <label class="checkbox">
                  <input v-model="isNoticeOpen" type="checkbox" />
                  채팅 공지사항 항상 보이기
                </label>
              </div>

              <div class="panel-block is-active">
                <span>닉네임 설정</span>
                <input v-model="userNickname" class="input" type="text" placeholder="닉네임 변경" />
              </div>

              <div class="panel-block is-active">
                <button @click="saveSettings(global.STORAGE.KEY)" class="button is-primary">
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>

<script>
  import { TEST_GLOBAL } from '../common/global';

  export default {
    name: 'Setting',
    data() {
      return {
        global: {},
        isNoticeOpen: false,
        userNickname: '',
        settingData: [],
      };
    },
    created() {
      this.global = TEST_GLOBAL;
    },

    mounted() {
      if (this.loadSettings(this.global.STORAGE.KEY)) {
        this.isNoticeOpen = this.loadSettings(this.global.STORAGE.KEY)[0].isNoticeOpen;
        this.userNickname = this.loadSettings(this.global.STORAGE.KEY)[0].userNickname;
      }
    },
    methods: {
      loadSettings(key) {
        return JSON.parse(localStorage.getItem(key));
      },

      saveSettings(key) {
        this.removeSettings(this.global.STORAGE.KEY);

        if (this.loadSettings(this.global.STORAGE.KEY) === null) {
          this.settingData = [];
          this.settingData.push({ isNoticeOpen: this.isNoticeOpen, userNickname: this.userNickname });

          localStorage.setItem(key, JSON.stringify(this.settingData));

          alert('저장했습니다.');
        }
      },

      removeSettings(key) {
        localStorage.removeItem(key);
      },
    },
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
