import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,
  },
  mutations: {
    USER_LOGIN: (state) => {
      state.logged = true;
    },
    USER_LOGOUT: (state) => {
      state.logged = false;
    },
  },
  actions: {
  },
  modules: {
  },
});
