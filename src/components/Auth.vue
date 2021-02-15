<template src="@/templates/Auth.html"></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { Authorization, CurrentUser } from '@/models/login.model';
import Notification from '@/components/Notification.vue';
import { mapMutations, mapState } from 'vuex';

@Component({
  components: {
    Notification,
  },
  computed: {
    ...mapState({
      notifications: 'notification',
      logged: 'logged',
    }),
  },
  methods: {
    ...mapMutations([
      'updateNotification',
      'updateLoggedStatus',
      'updateCurrentUser',
    ]),
  },
})
export default class Auth extends Vue {
  email = '';
  password = '';

  created() {
    this.getCurrentUser(localStorage.getItem('token') as string);
  }

  validateEmail(email: string) {
    const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
    return regex.test(String(email).toLowerCase());
  }

  validateForm() {
    return !(this.validateEmail(this.email) && this.password);
  }

  addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result.toISOString();
  }

  showNotification(status: boolean, message?: string, type?: string) {
    const data = {
      status,
      message,
      type,
    };
    this.updateNotification(data);
  }

  getCurrentUser(token: string) {
    if (this.logged) {
      axios.get('https://api.phrase.com/v2/user', {
        auth: { username: token, password: '' },
      }).then((response: { data: CurrentUser }) => {
        this.updateCurrentUser(response.data.name);
      }).catch((e) => {
        console.log(e);
      });
    }
  }

  login() {
    const date = new Date();
    axios.post('https://api.phrase.com/v2/authorizations', {
      note: 'Vue Code Challenge',
      scopes: ['read', 'write'],
      expires_at: this.addDays(date, 1),
    }, {
      auth: { username: this.email, password: this.password },
    }).then((response: { data: Authorization }) => {
      if (response.data) {
        this.showNotification(false);
        this.updateLoggedStatus(true);
      }
      localStorage.setItem('authId', response.data.id);
      localStorage.setItem('username', this.email);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expDate', response.data.expires_at);
      this.getCurrentUser(localStorage.getItem('token') as string);
      this.$emit('loginSuccessful');
    }).catch((e) => {
      if (e.response.status === 401) {
        this.showNotification(true, 'Wrong e-mail or password', 'warning');
      } else {
        this.showNotification(true, 'Unknown error occurred', 'danger');
      }
    });
  }
}
</script>

<style lang="scss">
@import "../styles/auth";
</style>
