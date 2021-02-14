<template>
  <div
    class="notification-container"
    :class="{
      danger: notifications.type === 'danger',
      'warning': notifications.type === 'warning',
      'success': notifications.type === 'success'
    }">
    <close-circle-icon v-if="notifications.type === 'danger'" fill-color="white" :size="iconSize"/>
    <alert-icon v-if="notifications.type === 'warning'" fill-color="white" :size="iconSize"/>
    <check-circle-icon v-if="notifications.type === 'success'" fill-color="white" :size="iconSize"/>
    <div class="text">{{ notifications.message }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CloseCircleIcon from 'vue-material-design-icons/CloseCircle.vue';
import AlertIcon from 'vue-material-design-icons/Alert.vue';
import CheckCircleIcon from 'vue-material-design-icons/CheckCircle.vue';
import { mapMutations, mapState } from 'vuex';

@Component({
  components: {
    CloseCircleIcon,
    AlertIcon,
    CheckCircleIcon,
  },
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
})
export default class Notification extends Vue {
  iconSize = 15;
}
</script>

<style lang="scss">
  .danger {
    background-color: darkred;
  }
  .warning {
    background-color: orange;
  }
  .success {
    background-color: green;
  }
  .notification-container {
    display: flex;
    border-radius: 0.3rem;
    color: white;
    padding: 0.35rem 0.5rem 0.45rem 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    max-width: 150px;
    span {
      margin-top: 2px;
    }
    .text {
      margin-left: 0.4rem;
      text-align: left;
    }
  }
</style>
