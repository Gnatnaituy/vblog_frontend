<template>
  <div id="home">
    <el-container>
      <!-- header -->
      <component-header></component-header>

      <el-container style="margin-top: 70px">
        <el-row style="width: 100%">
          <el-col :span="5" :offset="2">
            <card-hot-user style="position: relative"></card-hot-user>
          </el-col>

          <el-col :span="10" style="padding: 0 10px 10px 10px">
            <div class="text item vblog-post-me"> <b>{{ poster() }}</b> </div>
            <scroll-page></scroll-page>
          </el-col>

          <el-col :span="5">
            <card-user></card-user>
          </el-col>
        </el-row>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header"
import CardUser from "../components/user/CardUser"
import ScrollPage from "../components/ScrollPage"
import CardHotUser from "../components/user/CardHotUser"
import { mapState } from "vuex"

export default {
  name: 'UserHome',

  components: {
    'component-header': Header,
    'card-user': CardUser,
    'scroll-page': ScrollPage,
    'card-hot-user': CardHotUser
  },

  data() {
    return {

    };
  },

  computed: {
    ...mapState(['token', 'currentUser'])
  },

  methods: {
    poster() {
      return this.token.userId === this.currentUser.id ? '我的动态' :
        this.currentUser.gender === '男' ? '他的动态' : '她的动态'
    }
  }
};
</script>

<style>
.el-main {
  padding: 0;
}

.el-card {
  border-radius: 4px;
  border: none;
}

.vblog-post-me {
  padding: 0 5px 5px 5px;
  color: rgb(70, 70, 70);
}
</style>
