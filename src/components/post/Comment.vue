<template>
  <div class="text item" style="padding: 10px 0 0 0">
    <div style="display: flex; flex-direction: column" v-on:mouseenter="toggleOperation" v-on:mouseleave="toggleOperation">
      <div style="display: flex; flex-direction: row">
        <user-info :userInfo="comment.commenter"></user-info>
        <div v-if="comment.commentId !== null" style="padding: 0 5px; font-size: 14px; color: #454649">
          回复
        </div>
        <user-info v-if="comment.commentId !== null" :userInfo="comment.commenter"></user-info>
        <div class="text item" style="padding: 0; margin: 0; font-size: 14px; color: #454649">
          : {{ comment.content }}
        </div>
      </div>
      <div style="display: flex; flex-direction: row">
        <span style="padding: 0; font-size: 12px; color: #606266;" >
          {{ formatTime(comment.commentTime) }}
        </span>
        <el-button type="text" size="mini" style="padding: 0; align-items: flex-end"
          v-show="isDeleteBotton === true"
          @click="deleteComment(comment.id)">
          删除
        </el-button>
        <el-button type="text" size="mini" style="padding: 0; align-items: flex-end"
          v-show="isReplyBotton === true"
          @click="showReply">
          回复
        </el-button>
      </div>
    </div>

    <!-- comment form -->
    <el-form v-show="isReply === true" :inline="true" :model="reply" style="margin: 0">
      <el-form-item>
        <el-input v-model="reply.content" size="mini"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain round size="mini" @click="saveReply">回复</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { formatTime } from "../../utils/time";
import UserInfo from "../user/UserInfo";
import axios from "axios";

export default {
  name: "Comment",

  components: {
    "user-info": UserInfo
  },

  props: {
    postId: null,
    comment: Object
  },

  data() {
    return {
      reply: {
        postId: this.postId,
        commentId: this.comment.id,
        content: ""
      },
      isReplyBotton: false,
      isDeleteBotton: false,
      isReply: false
    };
  },

  methods: {
    formatTime(time) {
      return formatTime(time);
    },

    toggleOperation() {
      // User can reply when he logged in
      if (this.$store.getters.isLogIn) {
        this.isReplyBotton = !this.isReplyBotton;
      }
      // User can delete the comment only when he logged in and is the commenter
      if (this.$store.getters.isLogIn === true && this.$store.getters.token.userId === this.comment.commenter.id) {
        this.isDeleteBotton = !this.isDeleteBotton;
      }
    },

    showReply() {
      this.isReply = !this.isReply;
    },

    saveReply() {
      axios.post("/post/comment/save", this.reply).then(res => {
          if (res.status === 200) {
            if (res.data.code === '1') {
              setTimeout(() => {
                this.$emit("refreshComments");
              }, 1000)
            } else {
              this.$message({
                type: "warning",
                message: res.data.message,
                showClose: false
              });
            }
          }
        }).catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "No posts!",
              showClose: true
            });
          }
        }).finally(() => {
          this.isReply = false;
        });
    },
    
    deleteComment(commentId) {
      axios.delete(`/post/comment/${commentId}`).then(res => {
        if (res.status === 200) {
          if (res.data.code === '1') {
            setTimeout(() => {
              this.$emit("refreshComments");
            }, 1000)
          } else {
            this.$message({
              type: "warning",
              message: res.data.message,
              showClose: false
            });
          }
        }
      }).catch(err => {
        this.$message({
          type: "error",
          message: res.data.message,
          showClose: false
        });
      }).finally(() => {
      });
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>