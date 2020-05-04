<template>
  <div class="message-card">
    <div>
      <b>点赞信息</b>
      <el-link type="primary" :underline=false class="message-button-read-all" v-on:click="readAllMessage()">
        <i class="el-icon-finished"></i>
      </el-link>
    </div>
    <div v-for="message in messageVotes" :key="message.id" class="text item message-item">
      <div>
        <el-link type="primary" :underline=false class="message-item-text"
                 v-on:click="userPage(message)" :disabled="message.status === 1">
          {{ message.createUser.nickname }}
        </el-link>
        <el-link :underline=false class="message-item-text"
                 :disabled="message.status === 1">
          赞了你的动态
        </el-link>
        <el-link type="primary" :underline=false class="message-button"
                 :disabled="message.status === 1" v-on:click="mainPage(message)">
          查看详情
        </el-link>
      </div>
      <span class="message-time">
        {{ formatTime(message.createTime) }}
      </span>
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
  .message-button-read-all {
    float: right;
    padding-top: 2px;
  }
  .el-icon-finished {
    font-weight: bold;
    font-size: 16px;
    float: right;
    text-align: center;
    vertical-align: middle;
  }
  .message-button {
    font-weight: normal;
    font-size: 12px;
    float: right;
    padding-top: 4px;
  }
  .message-time {
    padding: 2px 0 0 0;
    font-size: 11px;
    color: #606266;
  }
</style>
