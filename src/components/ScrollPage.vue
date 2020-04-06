<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <ul class="list" v-infinite-scroll='loadPosts' infinite-scroll-disabled='disabled' infinite-scroll-distance="200">
      <li v-for="post in posts" v-bind:key="post.id">
        <post-item :post="post"></post-item>
      </li>
    </ul>
    <el-card v-if="loading" style= "margin-bottom: 10px; box-shadow: none; min-height: 40px;">
      <div style="text-align: center; color: gray">
        Loading......
      </div>
    </el-card>
    <el-card v-if="noNewPosts" style= "margin-bottom: 10px; box-shadow: none; min-height: 40px;">
      <div style="text-align: center; color: gray">
        No new posts......
      </div>
    </el-card>
  </div>
</template>

<script>
  import Post from "./post/Post";
  import axios from 'axios';

  export default {
    name: "ScrollPage",

    components: {
      'post-item': Post
    },

    data () {
      return {
        loading: false,
        noNewPosts: false,
        posts: [],
        page: {
          start: 0,
          size: 10
        }
      }
    },

    computed: {
      disabled () {
        return this.loading || this.noNewPosts
      }
    },

    methods: {
      loadPosts () {
        let that = this
        that.loading = true

        setTimeout(() => {
          axios.post('/open/post/list', {
            start: that.page.start,
            size: that.page.size
          }).then(response => {
            let newPosts = response.data.data.content
            if (newPosts && newPosts.length > 0) {
              that.page.start += 1
              that.posts = that.posts.concat(newPosts)
            } else {
              that.noNewPosts = true
            }
          }).catch(error => {
            if (error !== 'error') {
              that.$message({type: 'error', message: 'No posts!', showClose: true})
            }
          }).finally(() => {
            that.loading = false
          }, 2000)
        })
      }
    }
  }
</script>
