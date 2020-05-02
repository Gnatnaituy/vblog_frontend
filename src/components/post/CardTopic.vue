<template>
  <el-card class="card-topic">

    <div class="card-topic-header">
      <p>{{ currentTopic.name }}</p>
      <div class="text item">{{ formatTime(currentTopic.createTime) }}注册了VBLOG</div>
    </div>

    <el-link type="primary" :underline=false v-on:click="userPage(currentTopic.createUser.id)">
      {{ currentTopic.createUser.nickname }}
    </el-link>
    <div class="text item">{{ currentTopic.description }}</div>

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
