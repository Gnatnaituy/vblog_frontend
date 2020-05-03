<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <ul class="list" v-infinite-scroll="loadPosts" :infinite-scroll-disabled="disabled">
      <li v-for="post in posts" v-bind:key="post.id">
        <post-item @loadPosts="loadPosts" :post="post"></post-item>
      </li>
    </ul>
    <el-card v-if="this.loading" style= "margin-bottom: 10px; box-shadow: none; min-height: 40px;">
      <div style="text-align: center; color: gray">
        正在加载...
      </div>
    </el-card>
    <el-card v-if="this.noNewPosts" style= "margin-bottom: 10px; box-shadow: none; min-height: 40px;">
      <div style="text-align: center; color: gray">
        没有更多动态了...
      </div>
    </el-card>
  </div>
</template>

<script>
  import Post from "./post/Post"
  import axios from 'axios'
  import { mapState } from 'vuex'

  export default {
    name: "ScrollPage",

    components: {
      'post-item': Post
    },

    computed: {
      ...mapState(['loading', 'noNewPosts', 'searchVo', 'posts']),
      disabled () {
        console.log("scroll page disabled: ", this.loading || this.noNewPosts)
        return this.loading || this.noNewPosts
      }
    },

    methods: {
      loadPosts() {
        this.$store.commit('changeLoading', true)

        axios.post('/open/post/list', this.searchVo).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            const data = res.data.data
            if (data.content && data.content.length > 0) {
              this.searchVo.start += 1
              this.$store.commit('changeSearchVo', this.searchVo)
              // highlight the keyword if the posts listed by search
              if (this.searchVo.keyword !== '') {
                let reg = new RegExp(this.searchVo.keyword, 'ig')
                data.content.map(o => o.content = o.content.replace(reg, '<mark>' + this.searchVo.keyword + '</mark>'))
              }
              this.$store.commit('appendNewPosts', data.content)
              if (this.searchVo.start === data.totalPage) {
                this.$store.commit('changeNoNewPosts', true)
              }
            }
          }
        })

        this.$store.commit('changeLoading', false)
      }
    },

  }
</script>
