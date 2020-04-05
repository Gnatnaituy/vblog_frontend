<template>
  <el-card style= "margin-bottom: 10px; box-shadow: none; min-height: 200px;">
    <!-- Post header -->
    <div style="display: flex; flex-direction: row">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <div style="display: flex; flex-direction: column; margin: 5px 0 0 10px">
        <span>{{ post.poster.nickname }}</span>
        <span style="font-size: small">{{ formatTime(post.postTime) }}</span>
      </div>
    </div>

    <!-- Post content -->
    <div style="padding: 10px 10px 10px 50px">
      {{ post.content }}
    </div>

    <!-- vote and comment button -->
    <div style="padding: 0 10px 10px 50px;">
      <el-row>
        <el-button plain round size="mini">Vote</el-button>
        <el-button plain round size="mini">Comment</el-button>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  import axios from 'axios'
  import { formatTime } from '../../utils/time'


  export default {
    name: 'Post',

    props: {
      post: Object
    },

    data() {
      return {}
    },

    methods: {
      vote(postId) {
        axios.post('post/vote/vote', {
          postId: post.id
        })
      },
      formatTime(time) {
        return formatTime(time)
      }
    }
  }
</script>
