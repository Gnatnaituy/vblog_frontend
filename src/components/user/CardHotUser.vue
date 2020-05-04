<template>
  <el-card class="card-hot-user">
    <b>活跃用户</b>
    <el-divider></el-divider>
    <div class="hot-user-content" v-for="user in hotUsers" :key="user.user.id">
      <el-link type="primary" :underline=false v-on:click="userPage(user.user.id)">
        <el-avatar :size='35' :src="user.user.avatar"></el-avatar>
      </el-link>
      <el-link type="primary" :underline=false v-on:click="userPage(user.user.id)">
        {{ user.user.nickname }}
      </el-link>
      <div class="hot-user-content-num">
        <el-link :underline=false>
          <i class="el-icon-thumb">{{ user.voteCount }}</i>
        </el-link>
        <el-link :underline=false>
          <i class="el-icon-chat-square">{{ user.commentCount }}</i>
        </el-link>
        <el-link :underline=false>
          <i class="el-icon-position">{{ user.postCount }}</i>
        </el-link>
        <el-link :underline=false>
          <i class="el-icon-trophy">{{ user.count }}</i>
        </el-link>
      </div>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CardHotUser',

  data() {
    return {
      aggregationVo: {
        size: 10
      }
    }
  },

  computed: {
    ...mapState(['hotUsers'])
  },

  mounted() {
    axios.post('/open/post/hot-users', this.aggregationVo).then(res => {
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
    margin: 0 0 10px 0;
  }
  .hot-user-content {
    padding: 6px 0 0 0;
    width: 100%;
  }
  .hot-user-content-num {
    float: right;
    padding: 8px 4px 0 0
  }
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 4px 0;
  }
</style>
