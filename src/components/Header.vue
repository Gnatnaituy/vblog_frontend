<template>
  <el-header>
    <el-row>
      <!-- logo -->
      <el-col :span="7" style="font-size: 24px; margin-top: 8px">
        <h1>VBLOG</h1>
      </el-col>

      <!-- search pane -->
      <el-col :span="10">
        <el-input v-model="searchVo.keyword" style="margin-top: 10px;">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
        </el-input>
      </el-col>

      <!-- Avatar and message -->
      <el-col :span="7">
        <el-menu :router=true menu-trigger="click" mode="horizontal">
          <template v-if="this.$store.getters.isLogIn">
            <el-submenu index>
              <template slot="title">
                <img class="me-header-picture" :src="this.token.avatar"/>
              </template>
              <el-menu-item index="/" @click="post"><i class="el-icon-house"></i>动态首页</el-menu-item>
              <el-menu-item index="/profile" @click="profile"><i class="el-icon-user"></i>个人主页</el-menu-item>
              <el-menu-item index="/" @click="logout"><i class="el-icon-switch-button"></i>退出登录</el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
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
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'Header',

    computed: {
      ...mapState([
        'searchVo',
        'token'
      ])
    },

    methods: {
      post() {
        this.searchVo.start = 0
        this.searchVo.keyword = ''
        this.searchVo.poster = null
        this.$store.commit('changeSearchVo', this.searchVo)
        this.$store.commit('changeNoNewPosts', false)
        this.$store.commit('clearPosts')
        if (this.$route.path !== '/') {
          this.$router.push({path:'/'})
        }
      },

      search() {
        this.searchVo.start = 0
        this.searchVo.poster = null
        this.$store.commit('changeSearchVo', this.searchVo)
        this.$store.commit('changeNoNewPosts', false)
        this.$store.commit('clearPosts')
        if (this.$route.path !== '/search') {
          this.$router.push({path:'/search'})
        }
      },

      profile() {
        this.searchVo.start = 0
        this.searchVo.keyword = ''
        this.searchVo.poster = this.token.userId
        this.$store.commit('changeSearchVo', this.searchVo)
        this.$store.commit('changeNoNewPosts', false)
        this.$store.commit('clearPosts')
        if (this.$route.path !== '/profile') {
          this.$router.push({path:'/profile'})
        }
      },

      logout() {
        this.$store.commit('clearToken')
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
