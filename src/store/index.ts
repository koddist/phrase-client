import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,
    user: '',
    notification: {
      status: false,
      message: '',
      type: '',
    },
  },
  mutations: {
    updateNotification: (state, notification) => {
      state.notification = notification;
    },
    updateLoggedStatus: (state, status) => {
      state.logged = status;
    },
    updateCurrentUser: (state, user) => {
      state.user = user;
    },
  },
  actions: {
  },
  modules: {
  },
});
