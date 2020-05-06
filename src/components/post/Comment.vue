<template>
  <div class="text item" style="padding: 10px 0 0 0">
    <div style="display: flex; flex-direction: column" v-on:mouseenter="toggleOperation" v-on:mouseleave="toggleOperation">
      <div style="display: flex; flex-direction: row">
        <el-link type="primary" :underline=false v-on:click="userPage(comment.commenter.id)">
          {{ comment.commenter.nickname }}
        </el-link>
        <div v-if="comment.commentId !== null" style="padding: 0 5px; font-size: 14px; color: #454649">
          回复
        </div>
        <el-link type="primary" :underline=false v-if="comment.commentId !== null" v-on:click="userPage(comment.originCommenter.id)">
          {{ comment.originCommenter.nickname }}
        </el-link>
        <div class="text item" style="padding: 0; margin: 0; font-size: 14px; color: #454649">
          : {{ comment.content }}
        </div>
      </div>
      <div>
        <span style="padding: 0; font-size: 12px; color: #606266;" >
          {{ formatTime(comment.commentTime) }}
        </span>
        <el-button type="text" size="mini" style="padding: 0 10px 0 0; float: right"
                   v-show="isReplyButton === true"
                   @click="showReply">
          回复
        </el-button>
        <el-button type="text" size="mini" style="padding: 0 10px 0 0; float: right"
                   v-show="isDeleteButton === true"
                   @click="deleteComment(comment.id)">
          删除
        </el-button>
      </div>
    </div>

    <!-- comment form -->
    <el-input v-model="reply.content" size="mini" v-show="isReply === true"
              placeholder="请输入内容" style="width: 98%; margin: 5px 0 0 0"
              @keyup.enter.native="saveReply()">
    </el-input>
  </div>
</template>

<script>
import { formatTime } from '../../utils/time'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Comment',

  props: {
    postId: null,
    comment: {
      id: null,
      postId: null,
      commentId: null,
      content: null,
      originCommenter: null,
      commenter: null,
      commentTime: null
    }
  },

  data() {
    return {
      reply: {
        postId: this.postId,
        commentId: this.comment.id,
        content: ""
      },
      isReplyButton: false,
      isDeleteButton: false,
      isReply: false
    };
  },

  computed: {
    ...mapState(['token'])
  },

  methods: {
    ...mapActions(['user']),
    userPage(userId) {
      this.user(userId)
      if (this.$route.path !== '/user') {
        this.$router.push({path: '/user'})
      }
    },

    formatTime(time) {
      return formatTime(time);
    },

    toggleOperation() {
      // User can reply when he logged in
      if (this.$store.getters.logged) {
        this.isReplyButton = !this.isReplyButton;
      }
      // User can delete the comment only when he logged in and is the commenter
      if (this.$store.getters.logged === true && this.token.userId === this.comment.commenter.id) {
        this.isDeleteButton = !this.isDeleteButton;
      }
    },

    showReply() {
      this.isReply = !this.isReply;
    },

    saveReply() {
      axios.post('/post/comment/save', this.reply).then(res => {
          if (res.status === 200) {
            if (res.data.code === '1') {
              setTimeout(() => {
                this.$emit('refreshComments');
              }, 1000)
            } else {
              this.$message({
                type: 'warning',
                message: res.data.message,
                showClose: false
              });
            }
          }
        }).finally(() => {
          this.isReply = false;
        });
    },

    deleteComment(commentId) {
      axios.delete(`/post/comment/${commentId}`).then(res => {
        if (res.status === 200 && res.data.code === '1') {
          this.$store.state.posts.filter(o => o.id === this.comment.postId)
            .map(o => o.comments = o.comments.filter(o => o.id !== this.comment.id))
          this.$store.commit('changePosts', this.$store.state.posts)
        }
      })
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
