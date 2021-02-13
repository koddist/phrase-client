<template src="@/App.html"></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import AccountIcon from 'vue-material-design-icons/Account.vue';
import Auth from '@/components/Auth.vue';
import { mapMutations, mapState } from 'vuex';

@Component({
  components: {
    MenuIcon,
    AccountIcon,
    Auth,
  },
  computed: {
    ...mapState({
      logged: 'logged',
    }),
  },
  methods: {
    ...mapMutations([
      'USER_LOGOUT',
    ]),
  },
})
export default class App extends Vue {
  logOut() {
    this.USER_LOGOUT();
  }
}

</script>

<style lang="scss">
@import "src/styles/style";
@import "src/styles/app";
</style>
