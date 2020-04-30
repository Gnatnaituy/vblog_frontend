<template>
  <el-card class = "vblog_post">
    <!-- Post header -->
    <div class = "vblog_post_header">
      <el-avatar :src="post.poster.avatar"></el-avatar>
      <div class="vblog_post_header_content">
        <user-info :userInfo="post.poster"></user-info>
        <span class="vblog_post_post_time">
          {{ formatTime(post.postTime) }}
        </span>
      </div>
    </div>

    <!-- Post content -->
    <div class="vblog_post_content">
      {{ post.content }}
    </div>
    
    <!-- Post images -->
    <div class="vblog_post_images" v-if="post.images.length !== 0">
      <el-image class="vblog_post_images_item"
        v-for="image in post.images"
        v-bind:key="image.id"
        fit="cover"
        :preview-src-list="post.images.map(image => image.url)"
        :src="image.url">
      </el-image>
    </div>

    <!-- vote and comment button -->
    <div class="vblog_post_operation_button" v-if="this.$store.getters.isLogIn">
      <el-row>
        <el-button plain round size="mini" @click="deletePost">删除</el-button>
        <el-button plain round size="mini" @click="saveVote">赞</el-button>
        <el-button plain round size="mini" @click="toggleComment">评论</el-button>
      </el-row>
      <!-- comment form -->
      <el-form class="vblog_comment_form" v-show="showComment === true"
        :inline="true" :model="comment">
        <el-form-item>
          <el-input v-model="comment.content" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain round size="mini" @click="saveComment">评论</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- votes -->
    <div class="vblog_vote" v-if="post.voters.length !== 0">
      <user-info v-for="voter in post.voters" 
        v-bind:key="voter.id"
        :userInfo="voter">
      </user-info>
      觉得很赞
    </div>

    <!-- comments -->
    <div class="vblog_comment" v-if="post.comments.length !== 0">
        <comment-item @refreshComments="refreshComments" 
          v-for="comment in post.comments"
          v-bind:key="comment.id"
          :postId="post.id"
          :comment="comment">
        </comment-item>
    </div>
  </el-card>
</template>

<script>
  import axios from 'axios'
  import { formatTime } from '../../utils/time'
  import UserInfo from "../user/UserInfo";
  import Comment from "./Comment"

  export default {
    name: 'Post',

    components: {
      "user-info": UserInfo,
      "comment-item": Comment
    },

    props: {
      post: Object
    },

    data() {
      return {
        vote: {
          postId: this.post.id,
          disvote: this.post.voteByMe
        },
           
        comment: {
          postId: this.post.id,
          content: '',
        },
        
        showComment: false
      }
    },

    methods: {
      // Delete post
      deletePost() {
        axios.delete(`/post/${this.post.id}`).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            setTimeout(() => {
              this.$emit("loadPosts")
            }, 1000)
          } else {
            this.$message({
              type: "warning",
              message: "删除失败!",
              showClose: false
            });
          }
        })
      },

      // Save vote and refresh voters of this post after 1s
      saveVote(postId) {
        axios.post('/post/vote/vote', this.vote).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.post.voteByMe = !this.post.voteByMe
              this.vote.disvote = this.post.voteByMe
              setTimeout(() => {
                axios.get(`/open/post/voters/${this.post.id}`).then(response => {
                if (response.status === 200) {
                  this.$set(this.post, "voters", response.data.data)
                }
              })}, 1000)
            } else {
              this.$message({
                type: "warning",
                message: "点赞失败!",
                showClose: false
              });
            }
        })
      },

      // Toggle visibility of comment form
      toggleComment() {
        this.showComment = !this.showComment;
      },

      // Save comment and refresh comments of this post
      saveComment() {
        axios.post('/post/comment/save', this.comment).then(res => {
          if (res.status === 200) {
            if (res.data.code === '1') {
              setTimeout(() => {
                this.refreshComments()
                this.comment.content = ''
              }, 1000)
            } else {
              this.$message({
                type: "warning",
                message: res.data.message,
                showClose: false
              });
            }
          }
        }).finally(() => {
          this.showComment = false
        })
      },

      // Refresh comments of this post
      // Invoke when save or delete comment or reply
      refreshComments() {
        axios.get(`/open/post/comments/${this.post.id}`).then(res => {
          if (res.status === 200) {
            this.$set(this.post, 'comments', res.data.data)
          }
        })
      },

      formatTime(time) {
        return formatTime(time)
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0;
  }

  .vblog_post {
    margin-bottom: 10px;
    box-shadow: none;
    min-height: 150px;
  }

  .vblog_post_header {
    display: flex;
    flex-direction: row;
  }

  .vblog_post_header_content {
    display: flex;
    flex-direction: column;
    margin: 5px 0 0 10px;
  }

  .vblog_post_post_time {
    font-size: small;
    padding-top: 2px;
    color: #606266
  }

  .vblog_post_content {
    padding: 10px 10px 10px 50px;
  }

  .vblog_post_images {
    padding: 10px 10px 10px 50px;
  }

  .vblog_post_images_item {
    width: 33%;
    height: 180px;
  }

  .vblog_post_operation_button {
    padding: 0 10px 10px 50px;
  }

  .vblog_vote {
    margin: 0 10px 5px 50px;
    padding: 0 0 5px 0;
    font-size: 14px;
    color: #68696b;
  }

  .vblog_comment {
    margin: 0 10px 0 50px;
    padding: 0 0 5px 10px;
    background-color: rgb(249, 252, 255);
  }

  .vblog_comment_form {
    margin: 0
  }
</style>