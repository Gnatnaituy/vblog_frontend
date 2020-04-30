<template>
  <el-card class="card-hot-user">
    <div slot="header" class="">
      <span>活跃用户</span>
    </div>
    <div v-for="user in hotUsers" :key="user.user.id">
      <el-tag size="medium" effect="plain" class="hot-user" @click="clickHotUser(user)">
        {{ user.user.nickname + ' ' + user.count }}
      </el-tag>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: "CardHotUser",

  data() {
    return {
      aggregationVo: {
        size: 10
      }
    }
  },

  computed: {
    ...mapState([
      "hotUsers",
      "searchVo"
    ])
  },

  mounted() {
    axios.post("/open/post/hot-users", this.aggregationVo).then(res => {
      if (res.status === 200 && res.data.code === '1') {
        this.$store.commit('initHotUsers', res.data.data)
      }
    })
  },

  methods: {
    clickHotUser(user) {
      this.searchVo.start = 0
      this.searchVo.keyword = ''
      this.searchVo.poster = user.user.id
      this.$store.commit('changeSearchVo', this.searchVo)
      this.$store.commit('changeNoNewPosts', false)
      this.$store.commit('clearPosts')
      if (this.$route.path !== '/search') {
        this.$router.push({path:'/search'})
      }
    }
  }
}
</script>

<style scoped>
.card-hot-user {
  box-shadow: none;
  margin-bottom: 10px;
}
.hot-user-content {
  margin-bottom: 20px;
}
.hot-user {
  float: left;
  margin: 2px
}
</style>