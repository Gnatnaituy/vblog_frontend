<template>
  <el-card class="card-hot-user">
    <b>活跃用户</b>
    <div v-for="user in hotUsers" :key="user.user.id">
      <el-tag size="medium" effect="plain" class="hot-user" @click="userPage(user.user.id)">
        {{ user.user.nickname + ' ' + user.count }}
      </el-tag>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

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
      "hotUsers"
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
    ...mapActions(['user']),

    userPage(userId) {
      this.user(userId)
      if (this.$route.path !== '/user') {
        this.$router.push({path: '/user'})
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
