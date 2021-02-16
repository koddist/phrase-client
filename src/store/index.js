import { createStore } from 'vuex';

export default createStore({
  state: {
    logged: false,
    customerName: '',
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
    updateCurrentUser: (state, name) => {
      state.customerName = name;
    },
  },
  actions: {
  },
  modules: {
  },
});
