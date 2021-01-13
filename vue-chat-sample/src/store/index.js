import { createStore } from 'vuex';

const store = createStore({
  state: {
    socketId: '',
  },
  getters: {
    getSocketId: (state) => {
      return state.socketId;
    }
  },
  action: {
    
  },
  mutations: {
    setId(socketId, id) {
      socketId = id;
    },
  },
});

export default store;