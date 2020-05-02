<template>
  <el-card class="card-user">
    <div class="demo-image">
      <el-image class="card-user-background" :src="currentUser.background"></el-image>
    </div>

    <div class="card-user-header">
      <p>{{ currentUser.username }}</p>
      <div class="text item">{{ formatTime(currentUser.registerTime) }}注册了VBLOG</div>
      <el-avatar :src="currentUser.avatar"></el-avatar>
    </div>

    <div class="text item">{{ currentUser.nickname }}</div>
    <div class="text item">{{ currentUser.bio }}</div>
  </el-card>
</template>

<script>
  import { formatTime } from '../../utils/time';
  import { mapState } from 'vuex'

  export default {
    name: 'CardUser',

    computed: {
      ...mapState(['currentUser'])
    },

    methods: {
      formatTime(time) {
        return formatTime(time);
      }
    }
  }
</script>

<style scoped>
  .el-card__body {
    padding: 0
  }

  .card-user {
    box-shadow: none;
  }

  .card-user-background {
    width: 115%;
    height: 100%;
    margin: -20px -20px 0 -20px;
  }

  .card-user-header {
    display: inline-block;
  }
</style>
