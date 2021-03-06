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
      try {
        return state.questions[type].find((list) => list.question === question).answer;
      }
      catch(error) {
        return {'type': 'text', 'text': '다시 입력 해 주세요..'};
      }
    },
    getTypeByQuestion: (state) => (type, question) => {
      return state.questions[type].find((list) => list.question === question).type
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