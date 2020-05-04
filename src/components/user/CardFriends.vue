<template>
  <el-card class="card-hot-user">
    <b>我的好友</b>
    <el-divider></el-divider>
    <div class="hot-user-content" v-for="friend in friends" :key="friend.id">
      <el-link type="primary" :underline=false v-on:click="userPage(friend.id)">
        <el-avatar :size="35" :src="friend.avatar"></el-avatar>
      </el-link>
      <el-link type="primary" v-if="friend.remark !== null" :underline=false v-on:click="userPage(friend.id)">
        {{ friend.remark }}
      </el-link>
      <el-link type="primary" v-else :underline=false v-on:click="userPage(friend.id)">
        {{ friend.nickname }}
      </el-link>
      <div class="hot-user-content-num">
        <el-link :underline=false>
          {{ visibility(friend) }}
        </el-link>
      </div>
    </div>
  </el-card>
</template>

<script>
  import axios from 'axios'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'CardFriends',

    data() {
      return {
        listFriendVo: {
          start: 0,
          size: 20
        }
      }
    },

    computed: {
      ...mapState(['friends'])
    },

    mounted() {
      axios.post('/user/friend/list', this.listFriendVo).then(res => {
        if (res.status === 200 && res.data.code === '1') {
          this.$store.commit('initFriends', res.data.data.content)
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
      },
      visibility(friend) {
        switch (friend.visibility) {
          case 1:
            return '双方可见'
          case 2:
            return '不看他的动态'
          case 3:
            return '不让他看我的动态'
          case 4:
            return '互相不可见'
        }
      }
    }
  }
</script>

<style scoped>
  .card-hot-user {
    box-shadow: none;
    margin: 0 0 10px 0;
    min-height: 300px;
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
    margin: 8px 0;
  }
</style>
