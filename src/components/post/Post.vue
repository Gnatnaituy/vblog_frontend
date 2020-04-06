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
    <div  v-if="post.comments.length !== 0" style="margin: 0 10px 0 50px; padding: 5px 0 5px 10px; background-color: #F2F6FC">
        <comment-item v-for="comment in post.comments" v-bind:key="comment.id" :postId="post.id" :comment="comment"></comment-item>
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
          content: ''
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
        // axios.post('/post/comment/save', comment)
        console.log(this.comment)
        this.isComment = false
      },
      formatTime(time) {
        return formatTime(time)
      }
    }
  }
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0
}
</style>
