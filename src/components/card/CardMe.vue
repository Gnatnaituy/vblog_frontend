<template>
  <el-card class="card-me">
    <div class="demo-image">
      <el-image class="card-me-background" :src="userInfo.background"></el-image>
    </div>

    <div class="vblog-me-header">
      <p>{{ userInfo.username }}</p>
      <div class="text item">{{ formatTime(userInfo.registerTime) }}注册了VBLOG</div>
      <el-avatar :src="userInfo.avatar"></el-avatar>
    </div>

    <div class="text item">{{ userInfo.nickname }}</div>
    <div class="text item">{{ userInfo.bio }}</div>
  </el-card>
</template>

<script>
  import axios from 'axios'
  import { formatTime } from "../../utils/time";

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
      formatTime(time) {
        return formatTime(time);
      },

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

  .card-me {
    box-shadow: none;
  }

  .card-me-background {
    width: 115%;
    height: 100%;
    margin: -20px -20px 0 -20px;
  }

  .vblog-me-header {
    display: inline-block;
  }
</style>
