<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <ul class="list" v-infinite-scroll='loadPosts' infinite-scroll-disabled='disabled'>
      <li v-for="post in posts" v-bind:key="post.id">
        <post-item @loadPosts="loadPosts" :post="post"></post-item>
      </li>
    </ul>
    <el-card v-if="loading" style= "margin-bottom: 10px; box-shadow: none; min-height: 40px;">
      <div style="text-align: center; color: gray">
        正在加载...
      </div>
    </el-card>
    <el-card v-if="noNewPosts" style= "margin-bottom: 10px; box-shadow: none; min-height: 40px;">
      <div style="text-align: center; color: gray">
        没有更多动态了...
      </div>
    </el-card>
  </div>
</template>

<script>
  import Post from "./post/Post"
  import axios from 'axios'
  import state from '../store/state'
  import { mapGetters } from 'vuex'

  export default {
    name: "ScrollPage",

    components: {
      'post-item': Post
    },

    data () {
      return {
        loading: false,
        noNewPosts: false
      }
    },

    computed: {
      posts () {
        return this.$store.getters.posts
      },
      page () {
        return this.$store.getters.page
      },
      disabled () {
        return this.loading || this.noNewPosts
      }
    },

    methods: {
      loadPosts () {
        this.loading = true

        axios.post('/open/post/list', this.page).then(response => {
          const data = response.data.data
          if (data.content && data.content.length > 0) {
            this.$store.commit('changePageStart', this.$store.getters.page.start + 1)
            this.$store.commit('appendNewPosts', data.content)
          } else {
            this.noNewPosts = true
          }
        }).catch(error => {
          if (error !== 'error') {
            this.$message({type: 'error', message: 'No posts!', showClose: true})
          }
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>
