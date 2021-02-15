<template src="@/App.html"></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Auth from '@/components/Auth.vue';
import Projects from '@/components/Projects.vue';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import AccountIcon from 'vue-material-design-icons/Account.vue';
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
import { Project } from '@/models/login.model';

@Component({
  components: {
    Auth,
    Projects,
    MenuIcon,
    AccountIcon,
  },
  computed: {
    ...mapState({
      logged: 'logged',
      name: 'name',
    }),
  },
  methods: {
    ...mapMutations([
      'updateNotification',
      'updateLoggedStatus',
    ]),
  },
})
export default class App extends Vue {
  iconSize = 15;
  projects: Project[] = [];
  componentKey = 0;

  forceRerender() {
    this.componentKey += 1;
  }

  created() {
    this.checkProjects();
  }

  showNotification(status: boolean, message?: string, type?: string) {
    const data = {
      status,
      message,
      type,
    };
    this.updateNotification(data);
  }

  checkProjects() {
    const token = localStorage.getItem('token') as string;
    axios.get('https://api.phrase.com/v2/projects', {
      auth: { username: token, password: '' },
    }).then((response: { data: Project[] }) => {
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
  }

  logOut() {
    const authId: string = localStorage.getItem('authId') as string;
    const username: string = localStorage.getItem('username') as string;
    const password: string = prompt('Please enter your password for signing out') as string;
    if (password) {
      axios.delete(`https://api.phrase.com/v2/authorizations/${authId}`, {
        auth: { username, password },
      }).then((response) => {
        if (response.status === 204) {
          this.updateLoggedStatus(false);
          this.showNotification(true, 'You was successfully signed out.', 'success');
        }
      });
    }
  }
}

</script>

<style lang="scss">
@import "src/styles/style";
@import "src/styles/app";
</style>
