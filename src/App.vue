<template>
  <Auth v-if="!logged" @loginSuccessful="init()"/>
  <div class="container" :class="{ fullHeight: !logged }">
    <div class="header">
      <div class="title">
        <img alt="Phrase" src="https://developers.phrase.com/api/phrase-logo.png"> <span class="title-desc">Code challenge</span>
      </div>
      <div class="login" v-if="logged">
        <button
          class="header-button margin-x"
          type="button"
          @click="checkProjects()">Update projects</button>
        <button class="header-button-logout" type="button" @click="logOut()">
          <span v-if="customerName">{{ customerName }}</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
    <div class="content" v-if="logged">
      <Projects
        v-if="projects"
        :key="componentKey"
        :projects="updatedProjects"
        @projectUpdated="checkProjects()"/>
      <Pagination
        @paginated="getPages($event)"
        :totalRecords="projects.length"
        :perPageOptions="perPageOptions" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';
import Auth from './components/Auth.vue';
import Projects from './components/Projects.vue';
import Pagination from './components/Pagination.vue';

export default {
  name: 'App',
  components: {
    Auth,
    Projects,
    Pagination,
  },
  data() {
    const perPageOptions = ['4', '8', '16', '64'];
    return {
      userLogged: localStorage.getItem('userLogged') === 'true',
      projects: [],
      componentKey: 0,
      perPageOptions,
      pagination: { page: 1, per_page: perPageOptions[0] },
    };
  },
  created() {
    if (this.userLogged) {
      this.init();
    }
  },
  computed: {
    ...mapState({
      logged: 'logged',
      customerName: 'customerName',
    }),
    updatedProjects() {
      let data;
      if (!this.projects) {
        data = [];
      } else {
        const firstIndex = (this.pagination.page - 1) * this.pagination.per_page;
        const lastIndex = this.pagination.page * this.pagination.per_page;
        data = this.projects.slice(firstIndex, lastIndex);
      }
      this.forceRerender();
      return data;
    },
  },
  methods: {
    ...mapMutations([
      'updateNotification',
      'updateLoggedStatus',
      'updateCurrentUser',
    ]),
    init() {
      this.checkProjects();
      this.getCurrentUser(localStorage.getItem('token'));
    },
    forceRerender() {
      this.componentKey += 1;
    },
    getPages(pages) {
      this.pagination = pages;
    },
    showNotification(status, message, type) {
      const data = {
        status,
        message,
        type,
      };
      this.updateNotification(data);
    },
    // eslint-disable-next-line camelcase
    checkProjects() {
      const token = localStorage.getItem('token');
      // eslint-disable-next-line camelcase
      axios.get('https://api.phrase.com/v2/projects', {
        auth: { username: token, password: '' },
      }).then((response) => {
        this.updateNotification({ status: false });
        this.updateLoggedStatus(true);
        this.projects = response.data;
        this.forceRerender();
      }).catch((e) => {
        if (e.response.status !== 401) {
          this.showNotification(
            true,
            'The authentication session has expired. Please sign-in again.',
            'warning',
          );
        }
      });
    },
    logOut() {
      const authId = localStorage.getItem('authId');
      const username = localStorage.getItem('username');
      const password = prompt('Please enter your password for signing out');
      if (password) {
        axios.delete(`https://api.phrase.com/v2/authorizations/${authId}`, {
          auth: { username, password },
        }).then((response) => {
          if (response.status === 204) {
            this.updateLoggedStatus(false);
            this.showNotification(true, 'You was successfully signed out.', 'success');
            localStorage.setItem('logged', 'no');
          }
        });
      }
    },
    getCurrentUser(token) {
      axios.get('https://api.phrase.com/v2/user', {
        auth: { username: token, password: '' },
      }).then((response) => {
        this.updateCurrentUser(response.data.name);
      });
    },
  },
};
</script>

<style lang="scss">
@import "styles/app.scss";
</style>
