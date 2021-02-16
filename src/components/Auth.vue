<template>
  <transition name="slide" appear>
    <div class="modal">
      <div class="login-header">
        <h3>Login</h3>
      </div>
      <Notification
        v-if="notifications.status"
        :msg="notifications.message"
        :type="notifications.type"/>
      <div class="login-form">
        <label>
          <span>E-Mail</span>
          <input type="email" v-model="email">
        </label>
        <label>
          <span>Password</span>
          <input type="password" v-model="password">
        </label>
      </div>
      <div class="login-footer">
        <button
          :disabled="this.validateForm()"
          type="button"
          class="login"
          @click="login()">Login</button>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import Notification from '@/components/Notification.vue';

export default {
  name: 'Authentication',
  components: {
    Notification,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapState({
      notifications: 'notification',
      logged: 'logged',
    }),
  },
  methods: {
    ...mapMutations({
      updateNotification: 'updateNotification',
      updateLoggedStatus: 'updateLoggedStatus',
    }),
    validateEmail(email) {
      const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
      return regex.test(String(email).toLowerCase());
    },
    validateForm() {
      return !(this.validateEmail(this.email) && this.password);
    },
    addDays(date, days) {
      const result = new Date(date);
      result.setDate(date.getDate() + days);
      return result.toISOString();
    },
    showNotification(status, message, type) {
      const data = {
        status,
        message,
        type,
      };
      this.updateNotification(data);
    },
    login() {
      const date = new Date();
      axios.post('https://api.phrase.com/v2/authorizations', {
        note: 'Vue Code Challenge',
        scopes: ['read', 'write'],
        expires_at: this.addDays(date, 1),
      }, {
        auth: { username: this.email, password: this.password },
      }).then((response) => {
        if (response.data) {
          this.showNotification(false);
          this.updateLoggedStatus(true);
        }
        localStorage.setItem('authId', response.data.id);
        localStorage.setItem('username', this.email);
        localStorage.setItem('userLogged', 'true');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expDate', response.data.expires_at);
        this.$emit('loginSuccessful');
      }).catch((e) => {
        if (e.response.status === 401) {
          this.showNotification(true, 'Wrong e-mail or password', 'warning');
        } else {
          this.showNotification(true, 'Unknown error occurred', 'danger');
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/auth";
</style>
