<template>
  <div class="message-card">
    <b>好友请求</b>
    <div v-for="friendRequest in friendRequests" :key="friendRequest.id" class="text item message-item">
      <message-friend-request-item :friend-request="friendRequest"></message-friend-request-item>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import MessageFriendRequestItem from "./MessageFriendRequestItem";

  export default {
    name: "MessageFriendRequest",

    components: {
      'message-friend-request-item': MessageFriendRequestItem
    },

    computed: {
      ...mapState(['friendRequests'])
    }
  }
</script>

<style scoped>
  .message-card {
    padding: 5px;
    margin-top: 5px;
  }
  .message-item {
    width: 400px;
    margin-top: 6px;
  }
</style>
