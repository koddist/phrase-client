<template>
  <div
    class="notification-container"
    :class="{
      danger: notifications.type === 'danger',
      'warning': notifications.type === 'warning',
      'success': notifications.type === 'success'
    }">
    <div class="text">{{ notifications.message }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Notification',
  computed: {
    ...mapState({
      notifications: 'notification',
    }),
  },
  methods: {
    ...mapMutations([
      'updateNotification',
    ]),
  },
};
</script>

<style lang="scss">
@import "src/styles/notification";
</style>
