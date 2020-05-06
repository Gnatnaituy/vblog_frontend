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
            <!-- messages -->
            <el-menu-item>
              <el-popover placement="bottom" width="400px" trigger="click"  class="el-menu-notice">
                <message-friend-request v-show="friendRequests.length > 0"></message-friend-request>
                <el-divider v-if="friendRequests.length > 0 && (messageComments.length > 0 || messageVotes.length > 0)">
                </el-divider>
                <message-comment v-show="messageComments.length > 0"></message-comment>
                <el-divider v-if="messageComments.length > 0 && messageVotes.length > 0"></el-divider>
                <message-vote v-show="messageVotes.length > 0"></message-vote>
                <div class="text item" v-show="!hasNewMessage">没有新消息</div>
                <el-badge slot="reference" :is-dot="hasNewMessage" class="item">
                  <i class="el-icon-bell"></i>
                </el-badge>
              </el-popover>
            </el-menu-item>

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
  import MessageVote from './message/MessageVote'
  import MessageComment from './message/MessageComment'
  import MessageFriendRequest from './message/MessageFriendRequest'


  export default {
    name: 'Header',

    components: {
      'message-vote': MessageVote,
      'message-comment': MessageComment,
      'message-friend-request': MessageFriendRequest
    },

    data() {
      return {
        hasNewMessage: this.$store.state.messageVotes.length > 0
          || this.$store.state.messageComments.length > 0
          || this.$store.state.friendRequests.length > 0
      }
    },

    mounted() {
      if (this.$store.getters.logged === true) {
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
        axios.get('/user/friend/list/request').then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.$store.commit('initFriendRequests', res.data.data)
          }
        })
        console.log(this.friendRequests)
      }
    },

    computed: {
      ...mapState(['searchVo', 'token', 'messageVotes', 'messageComments', 'friendRequests'])
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
  .el-menu-item {
    font-size: 14px;
    color: #303133;
    padding: 0 20px 0 10px;
    cursor: pointer;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-submenu__title {
    font-size: 14px;
    color: #303133;
    padding: 0;
    cursor: pointer;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-menu-item [class^=el-icon-bell] {
    width: 24px;
    text-align: center;
    font-size: 30px;
    vertical-align: middle;
  }
  .el-menu-notice {
    padding: 15px 0 0 10px;
    height: 30px;
    line-height: 30px;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #909399;
  }
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 6px 0 6px 0;
  }
  .el-input__inner {
    background-color: #F2F6FC;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-bottom-width: 0;
    border-radius: 4px;
  }

  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }

  .el-upload--picture-card {
    background-color: #F2F6FC;
    border: none;
    width: 180px;
    height: 180px;
    line-height: 180px;
    vertical-align: top;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 0;
    border-radius: 0;
    box-sizing: unset;
    width: 180px;
    height: 180px;
    margin: -2px 0 -1px 0;
    display: inline-block;
  }
  .el-upload-list__item {
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
    transition: all .5s cubic-bezier(.55,0,.1,1);
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    margin-top: 0;
    position: relative;
    border: none;
    width: 100%;
  }
</style>
