<template>
  <div id="home">
    <el-container>
      <!-- header -->
    	<component-header></component-header>

      <!-- main content -->
      <el-container style="margin-top: 70px">
        <el-row style="width: 100%">
          <!-- aggregations -->
          <el-col :span="5" :offset="2">
            <card-hot-topic style="position: relative"></card-hot-topic>
            <card-hot-word style="position: relative"></card-hot-word>
          </el-col>

          <!-- post write & content board -->
          <el-col :span="10" style="padding: 0 10px 10px 10px">
            <post-write v-if="this.logged()"></post-write>
            <div class="text item vblog-post-scope">
              <el-link type="primary" :underline=false @click="mainPage()">
                全部动态
              </el-link>
              |
              <el-link type="primary" :underline=false @click="friendPage()">
                好友动态
              </el-link>
            </div>
            <scroll-page></scroll-page>
          </el-col>

          <!-- current user info & user recommends -->
          <el-col :span="5">
            <card-hot-user style="position: relative"></card-hot-user>
            <card-recommend-user v-if="this.logged()"></card-recommend-user>
          </el-col>
        </el-row>
      </el-container>
		</el-container>
  </div>
</template>

<script>
import Header from '../components/Header'
import ScrollPage from '../components/ScrollPage'
import PostWrite from '../components/post/PostWrite'
import CardHotWord from '../components/post/CardHotWord'
import CardHotTopic from '../components/post/CardHotTopic'
import CardHotUser from '../components/user/CardHotUser'
import CardRecommendUser from "../components/user/CardRecommendUser";
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PostHome',

  components: {
  	'component-header': Header,
    'scroll-page': ScrollPage,
    'post-write': PostWrite,
    'card-hot-word': CardHotWord,
    'card-hot-topic': CardHotTopic,
    'card-hot-user': CardHotUser,
    'card-recommend-user': CardRecommendUser
  },

  methods: {
    ...mapGetters(['logged']),
    ...mapActions(['friend', 'main']),
    friendPage() {
      this.friend(true)
      console.log(this.$store.state.searchVo)
      if (this.$route.path !== '/') {
        this.$router.push({path: '/'})
      }
    },
    mainPage() {
      this.main(null)
      console.log(this.$store.state.searchVo)
      if (this.$route.path !== '/') {
        this.$router.push({path: '/'})
      }
    },
  }
}
</script>

<style>
  .el-main {
    padding: 0;
  }

  .el-card {
    border-radius: 4px;
    border: none;
  }

  .vblog-post-scope {
    padding: 0 5px 5px 5px;
    color: rgb(70, 70, 70);
  }
</style>
