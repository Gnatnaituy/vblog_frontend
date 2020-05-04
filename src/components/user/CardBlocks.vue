<template>
  <el-card class="card-hot-user">
    <b>屏蔽用户</b>
    <el-divider></el-divider>
    <div class="hot-user-content" v-for="block in currentUser.blocks" :key="block.id">
      <el-link type="primary" :underline=false v-on:click="userPage(block.id)">
        <el-avatar :size='35' :src="block.avatar"></el-avatar>
      </el-link>
      <el-link type="primary" :underline=false v-on:click="userPage(block.id)">
        {{ block.nickname }}
      </el-link>
    </div>
  </el-card>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'CardBlocks',

    computed: {
      ...mapState(['currentUser'])
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
