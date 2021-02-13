<template src="@/templates/Auth.html"></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapMutations } from 'vuex';

@Component({
  methods: {
    ...mapMutations([
      'USER_LOGIN',
    ]),
  },
})
export default class Auth extends Vue {
  email = '';
  password = '';
  login() {
    this.USER_LOGIN();
    console.log({ email: this.email, password: this.password });
  }
  validateEmail(email: string) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }
  validateForm() {
    return !(this.validateEmail(this.email) && this.password);
  }
  login() {

  }
}
</script>

<style lang="scss">
@import "../styles/auth";
</style>
