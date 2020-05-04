<template>
  <el-card class="card-topic">
    <div class="demo-image">
      <el-image class="card-topic-background" :src="currentTopic.background"></el-image>
    </div>

    <div class="topic-information">
      <div>
        <div class="text item topic-information-item">
          <b>名称</b>:
          <p class="topic-information-value">
            {{ currentTopic.name }}
          </p>
        </div>
        <div class="text item topic-information-item">
          <b>描述</b>:
          <p class="topic-information-value">
            {{ currentTopic.description }}
          </p>
        </div>
        <div class="text item topic-information-item">
          <b>创建人</b>:
          <p class="topic-information-value">
            {{ currentTopic.createUser.nickname }}
          </p>
        </div>
        <div class="text item topic-information-item">
          <b>创建时间</b>:
          <p class="topic-information-value" style="margin-top: 2px">
            {{ formatTime(currentTopic.createTime) }}
          </p>
        </div>

        <el-divider></el-divider>
        <div class="text item topic-information-item">
          <b>活跃用户</b>
          <div>
            <el-link type="primary" :underline=false style="padding: 2px"
                     v-for="user in currentTopic.activeUsers" v-bind:key="user.id"
                     v-on:click="userPage(user.id)">
              <el-avatar :src="user.avatar" size='small' @click="userPage(currentTopic.createUser.id)">
              </el-avatar>
            </el-link>
          </div>
        </div>
      </div>
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
  .card-topic {
    box-shadow: none;
  }

  .card-topic-background {
    width: 115%;
    height: 100%;
    margin: -20px -20px 0 -20px;
  }

  .topic-information {
    width: 100%;
    font-size: 14px;
    display: inline-block;
  }
  .topic-information-item {
    padding-top: 5px;
  }
  .topic-information-value {
    float: right;
  }
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 14px 0 4px 0;
  }
</style>
