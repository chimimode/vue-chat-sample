import { createStore } from 'vuex';

const store = createStore({
  state: {
    socketId: '',
    questions: {}
  },
  getters: {
    getSocketId: (state) => {
      return state.socketId;
    },
    getQuestionsByType: (state) => (type) => {
      return state.questions[type]
    },
    getAnswerByQuestion: (state) => (type, question) => {
      return state.questions[type].find((list) => list.question === question).answer || '다시 입력 해 주세요'
    }
  },
  actions: {
    setSocketId({commit}, id) {
      commit('setSocketId', id);
    },
    setQuestions({commit}, questions) {
      commit('setQuestions', questions);
    },
  },
  mutations: {
    setSocketId(state, id) {
      state.socketId = id;
    },
    setQuestions(state, questions) {
      state.questions = questions;
    }
  },
});

export default store;