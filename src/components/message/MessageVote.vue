<template>
  <div class="message-card">
    <div>
      <b>点赞信息</b>
      <el-link type="primary" :underline=false class="message-button" v-on:click="readAllMessage()">
        全部标为已读
      </el-link>
    </div>
    <div v-for="message in messageVotes" :key="message.id" class="text item message-item">
      <div>
        <el-link type="primary" :underline=false class="message-item-text" v-on:click="userPage(message)" :disabled="message.status === 1">
          {{ message.createUser.nickname }}
        </el-link>
        <el-link :underline=false class="message-item-text" v-on:click="mainPage(message)" :disabled="message.status === 1">
          赞了你的动态
        </el-link>
        <span class="message-time">
          {{ formatTime(message.createTime) }}
        </span>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState, mapActions } from 'vuex'
  import { formatTime } from "../../utils/time";

  export default {
    name: 'MessageVote',

    computed: {
      ...mapState(['messageVotes'])
    },

    methods: {
      ...mapActions(['user', 'main']),
      mainPage(message) {
        this.main(message.postId)
        this.readMessage(message.id)
        if (this.$route.path !== '/') {
          this.$router.push({path: '/'})
        }
      },
      userPage(message) {
        this.user(message.createUser.id)
        this.readMessage(message.id)
        if (this.$route.path !== '/user') {
          this.$router.push({path: '/user'})
        }
      },

      readMessage(messageId) {
        this.messageVotes.filter(message => message.id === messageId).map(message => message.status = 1)
        this.$store.commit('initMessageVotes', this.messageVotes)
        axios.post('/post/post/read-message', {
          messageIds: [messageId],
          messageType: 'VOTE'
        })
      },
      readAllMessage() {
        this.messageVotes.map(message => message.status = 1)
        this.$store.commit('initMessageVotes', this.messageVotes)
        axios.post('/post/post/read-message', {
          messageIds: this.messageVotes.map(message => message.id),
          messageType: 'VOTE'
        })
      },

      formatTime(time) {
        return formatTime(time);
      }
    }
  }
</script>

<style scoped>
  .message-card {
    padding: 5px;
  }
  .message-item {
    width: 300px;
    margin-top: 2px;
  }
  .message-item-text {
    font-weight: normal;
    font-size: 13px;
  }
  .message-button {
    font-weight: normal;
    font-size: 13px;
    float: right;
    margin-left: 5px;
  }
  .message-time {
    padding: 2px 0 0 0;
    font-size: 13px;
    color: #606266;
    float: right;
  }
</style>
