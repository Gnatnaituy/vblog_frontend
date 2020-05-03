<template>
  <el-header>
    <el-row>
      <!-- logo -->
      <el-col :span="7" style="font-size: 24px; margin-top: 8px">
        <h1 @click="mainPage(null)">VBLOG</h1>
      </el-col>

      <!-- search pane -->
      <el-col :span="10">
        <el-input v-model="searchVo.keyword" style="margin-top: 10px;">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="postPage(searchVo.keyword)"></i>
        </el-input>
      </el-col>

      <!-- Avatar and message -->
      <el-col :span="7">
        <el-menu :router=true menu-trigger="click" mode="horizontal" style="float: right">
          <template v-if="this.logged()">
            <!-- avatar & submenus -->
            <el-submenu index="/">
              <template slot="title">
                <img class="me-header-picture" alt="avatar" :src="token.avatar" />
              </template>
              <el-menu-item index="/" @click="mainPage()">
                <i class="el-icon-house"></i>
                动态首页
              </el-menu-item>
              <el-menu-item index="/user" @click="userPage(token.userId)">
                <i class="el-icon-user"></i>
                个人主页
              </el-menu-item>
              <el-menu-item index="/" v-on:click="clearToken()">
                <i class="el-icon-switch-button"></i>
                退出登录
              </el-menu-item>
            </el-submenu>

            <!-- messages -->
            <el-menu-item>
              <el-popover placement="bottom-end" width="300px" trigger="click" transition="el-collapse-transition">
                <message-vote v-show="messageVotes.length > 0"></message-vote>
                <message-comment v-show="messageComments.length > 0"></message-comment>
                <div class="text item" v-show="messageVotes.length === 0 && messageComments.length === 0">暂未新消息</div>
                <i slot="reference" class="el-icon-bell"></i>
              </el-popover>
            </el-menu-item>
          </template>
          <template v-else>
            <!-- login & register -->
            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">注册</el-button>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  import axios from 'axios'
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import MessageVote from "./message/MessageVote";
  import MessageComment from "./message/MessageComment";


  export default {
    name: 'Header',

    components: {
      'message-vote': MessageVote,
      'message-comment': MessageComment
    },

    data() {
      return {}
    },

    mounted() {
      axios.get('/post/vote/messages').then(res => {
        if (res.status === 200 && res.data.code === '1') {
          this.$store.commit('initMessageVotes', res.data.data)
        }
      })
      axios.get('/post/comment/messages').then(res => {
        if (res.status === 200 && res.data.code === '1') {
          this.$store.commit('initMessageComments', res.data.data)
        }
      })
    },

    computed: {
      ...mapState(['searchVo', 'token', 'messageVotes', 'messageComments'])
    },

    methods: {
      ...mapGetters(['logged']),
      ...mapMutations(['clearToken']),
      ...mapActions(['main', 'post', 'user']),

      mainPage(postId) {
        this.main(postId)
        if (this.$route.path !== '/') {
          this.$router.push({path: '/'})
        }
      },
      postPage(keyword) {
        this.post(keyword)
        if (this.$route.path !== '/post') {
          this.$router.push({path: '/post'})
        }
      },
      userPage(userId) {
        this.user(userId)
        if (this.$route.path !== '/user') {
          this.$router.push({path: '/user'})
        }
      }
    }
  }
</script>

<style>
  .el-header {
    position: fixed;
    z-index: 1024;
    min-width: 100%;
    box-shadow: 0 1px 0 hsla(180, 100%, 1%, 0.04);
    background-color: rgb(255, 255, 255);
  }

  .me-header-picture {
    width: 36px;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
    background-color: rgba(95, 184, 120, 0.02);
  }
</style>
