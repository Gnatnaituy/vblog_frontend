<template>
  <div class="message-card">
    <div>
      <b>评论信息</b>
      <el-link type="primary" :underline=false class="message-button" v-on:click="readAllMessage()">
        全部标为已读
      </el-link>
    </div>
    <div v-for="message in messageComments" :key="message.id" class="text item message-item">
      <div>
        <el-link type="primary" :underline=false class="message-item-text"
                 :disabled="message.status === 1" v-on:click="userPage(message)">
          {{ message.createUser.nickname }}
        </el-link>
        <el-link v-if="message.commentId === null" :underline=false class="message-item-text"
                 :disabled="message.status === 1" v-on:click="mainPage(message)">
          评论了你的动态
        </el-link>
        <el-link v-else :underline=false class="message-item-text" v-on:click="mainPage(message)">
          回复了你的评论
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
    name: 'MessageComment',

    computed: {
      ...mapState(['messageComments'])
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
        this.messageComments.filter(message => message.id === messageId).map(message => message.status = 1)
        this.$store.commit('initMessageComments', this.messageComments)
        console.log(this.messageComments)
        axios.post('/post/post/read-message', {
          messageIds: [messageId],
          messageType: 'COMMENT'
        })
      },
      readAllMessage() {
        this.messageComments.map(message => message.status = 1)
        this.$store.commit('initMessageComments', this.messageComments)
        axios.post('/post/post/read-message', {
          messageIds: this.messageComments.map(message => message.id),
          messageType: 'COMMENT'
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
    padding-top: 3px;
  }
  .message-time {
    padding: 2px 0 0 0;
    font-size: 13px;
    color: #606266;
    float: right;
  }
</style>
