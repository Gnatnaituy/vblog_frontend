<template>
  <el-card class="card-topic">
    <div class="demo-image">
      <el-image class="card-user-background" :src="currentTopic.background"></el-image>
    </div>

    <div class="card-topic-header">
      <div class="text item">{{ currentTopic.name }}</div>
      <div class="text item">{{ currentTopic.description }}</div>
      <div class="text item">创建时间: {{ formatTime(currentTopic.createTime) }}</div>
      <div class="text item">创建用户:
        <el-link type="primary" :underline=false v-on:click="userPage(currentTopic.createUser.id)">
          {{ currentTopic.createUser.nickname }}
        </el-link>
      </div>
    </div>

    <div v-for="user in currentTopic.activeUsers" v-bind:key="user.id">
      <el-link type="primary" :underline=false v-on:click="userPage(user.id)">
        <el-avatar :src="user.avatar" size='medium' @click="userPage(currentTopic.createUser.id)">
        </el-avatar>
      </el-link>
    </div>

  </el-card>
</template>

<script>
  import { formatTime } from '../../utils/time';
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'CardTopic',

    computed: {
      ...mapState(['currentTopic'])
    },

    methods: {
      ...mapActions(['user']),
      userPage(userId) {
        this.user(userId)
        if (this.$route.path !== '/user') {
          this.$router.push({path: '/user'})
        }
      },

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

  .card-topic {
    box-shadow: none;
  }

  .card-topic-background {
    width: 115%;
    height: 100%;
    margin: -20px -20px 0 -20px;
  }

  .card-topic-header {
    display: inline-block;
  }
</style>
