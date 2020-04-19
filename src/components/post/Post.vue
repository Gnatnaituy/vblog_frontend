<template>
  <el-card style= "margin-bottom: 10px; box-shadow: none; min-height: 200px;">
    <!-- Post header -->
    <div style="display: flex; flex-direction: row">
      <el-avatar :src="post.poster.avatar"></el-avatar>
      <div style="display: flex; flex-direction: column; margin: 5px 0 0 10px">
        <user-info :userInfo="post.poster"></user-info>
        <span style="font-size: small; padding-top: 2px; color: #606266">{{ formatTime(post.postTime) }}</span>
      </div>
    </div>

    <!-- Post content -->
    <div style="padding: 10px 10px 10px 50px">
      {{ post.content }}
    </div>
    
    <!-- Post images -->
    <div style="padding: 10px 10px 10px 50px;">
      <el-image v-for="image in post.images" v-bind:key="image.id"
        :preview-src-list="post.images.map(image => image.url)"
        style="width: 200px; height: 200px"
        :src="image.url">
      </el-image>
    </div>

    <!-- vote and comment button -->
    <div style="padding: 0 10px 10px 50px;">
      <el-row>
        <el-button plain round size="mini" @click="saveVote">Like</el-button>
        <el-button plain round size="mini" @click="toggleComment">Comment</el-button>
      </el-row>

      <!-- comment form -->
      <el-form v-show="showComment === true" :inline="true" :model="comment" style="margin: 0">
        <el-form-item>
          <el-input v-model="comment.content" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain round size="mini" @click="saveComment">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- votes -->
    <div class="vblog-vote" v-if="post.voters.length !== 0">
      <user-info v-for="voter in post.voters" v-bind:key="voter.id" :userInfo="voter">
      </user-info>
      vote this post
    </div>

    <!-- comments -->
    <div class="vblog-comment" v-if="post.comments.length !== 0">
        <comment-item @refreshComments="refreshComments" 
        v-for="comment in post.comments" v-bind:key="comment.id" :postId="post.id" :comment="comment"></comment-item>
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
      saveVote(postId) {
        axios.post('/post/vote/vote', this.vote).then(res => {
          if (res.status === 200) {
            if (res.data.code === '1') {
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
                message: res.data.message,
                showClose: false
              });
            }
          }
        })
      },

      toggleComment() {
        this.showComment = !this.showComment;
      },

      saveComment() {
        axios.post('/post/comment/save', this.comment).then(res => {
          if (res.status === 200) {
            if (res.data.code === '1') {
              this.post.comments.unshift(res.data.data)
              this.comment.content = ''
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

  .vblog-vote {
    margin: 0 10px 5px 50px;
    padding: 0 0 5px 0;
    font-size: 15px;
    color: #454649;
  }

  .vblog-comment {
    margin: 0 10px 0 50px;
    padding: 0 0 5px 10px;
    background-color: #F7F9FA;
  }
</style>
