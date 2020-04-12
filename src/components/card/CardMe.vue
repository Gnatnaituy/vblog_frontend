<template>
  <el-card class="box-card" style="box-shadow: none">
    <div class="demo-image">
      <el-image style="width: 100%; height: 200px" :src="userInfo.background"></el-image>
    </div>
    <el-avatar :src="userInfo.avatar"></el-avatar>
    <div class="text item">{{ userInfo.registerTime }}</div>
    <div class="text item">{{ userInfo.username }}</div>
    <div class="text item">{{ userInfo.nickname }}</div>
    <div class="text item">{{ userInfo.bio }}</div>
  </el-card>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'CardMe',

    data() {
      return {
        userInfo: Object
      }
    },

    mounted() {
      this.user();
    },

    methods: {
      user() {
        if (this.$store.getters.isLogIn) {
          axios.get('/user/account/info').then(res => {
            if (res.status === 200) {
              this.userInfo = res.data.data
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .el-card__body {
    padding: 0
  }
</style>
