<template>
  <el-header>
    <el-row>
      <!-- logo -->
      <el-col :span="7" style="font-size: 24px; margin-top: 8px">
        <h1>VBLOG</h1>
      </el-col>

      <!-- search pane -->
      <el-col :span="10">
        <el-input placeholder="Search posts. users. etc..." v-model="postSearchVo.keyword" style="margin-top: 10px;">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>

      <!-- Avatar and message -->
      <el-col :span="7">
        <el-menu :router=true menu-trigger="click" mode="horizontal" active-text-color="#5FB878">
          <template v-if="user.login">
            <el-submenu index>
              <template slot="title">
                <img class="me-header-picture" :src="user.avatar"/>
              </template>
              <el-menu-item index @click="logout"><i class="el-icon-back"></i>Logout</el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item index="/login">
              <el-button type="text">Login</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">Register</el-button>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  import store from '../store'

  export default {
    name: 'Header',

    data() {
      return {
        postSearchVo: {
          keyword: '',
          start: 0,
          size: 10
        }
      }
    },

    computed: {
      user() {
        console.log('header -> login:', this.$store.getters.login)
        console.log('header -> token:', this.$store.getters.token)
        let login = this.$store.getters.login
        let avatar = login === false ? null : this.$store.getters.token.avatar
        return {
          login, avatar
        }
      }
    },

    methods: {
      logout() {
        let that = this
        this.$store.dispatch('logout').then(() => {
          location.reload()
        }).catch((error) => {
          if (error !== 'error') {
            that.$message({message: error, type: 'error', showClose: true});
          }
        })
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
