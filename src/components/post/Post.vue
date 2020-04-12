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
        style="width: 160px; height: 160px"
        :src="image.url">
      </el-image>
    </div>

    <!-- vote and comment button -->
    <div style="padding: 0 10px 10px 50px;">
      <el-row>
        <el-button plain round size="mini">Like</el-button>
        <el-button plain round size="mini" @click="showComment">Comment</el-button>
      </el-row>

      <!-- comment form -->
      <el-form v-show="isComment === true" :inline="true" :model="comment" style="margin: 0">
        <el-form-item>
          <el-input v-model="comment.content" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain round size="mini" @click="saveComment">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- comments -->
    <div class="vblog-comment" v-if="post.comments.length !== 0">
        <comment-item @returnReply="saveReply" @refreshComments="refreshComments" 
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
        comment: {
          postId: this.post.id,
          content: '',
        },
        isComment: false
      }
    },

    methods: {
      vote(postId) {
        axios.post('post/vote/vote', {
          postId: post.id
        })
      },
      showComment() {
        this.isComment = !this.isComment;
      },
      saveComment() {
        axios.post('/post/comment/save', this.comment).then(res => {
          if (res.status === 200) {
            this.post.comments.unshift(res.data.data)
            this.comment.content = ''
          }
        }).catch(error => {
          that.noNewPosts = true
          if (error !== 'error') {
            that.$message({type: 'error', message: 'Comment failed!', showClose: true})
          }
        }).finally(() => {
          this.isComment = false
        })
      },
      saveReply(reply) {
        this.post.comments.unshift(reply)
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
  .vblog-comment {
    margin: 0 10px 0 50px;
    padding: 5px 0 5px 10px;
    background-color: #F2F6FC;
  }
</style>
