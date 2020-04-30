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
            <card-hot-user style="position: relative"></card-hot-user>
            <card-hot-topic style="position: relative"></card-hot-topic>
            <card-hot-world style="position: relative"></card-hot-world>
          </el-col>

          <!-- post write & content board -->
          <el-col :span="10" style="padding: 0 10px 10px 10px">
            <post-write v-if="this.$store.getters.isLogIn"></post-write>
            <scroll-page></scroll-page>
          </el-col>

          <!-- current user info & user recommends -->
          <el-col :span="5">
            <card-me></card-me>
          </el-col>
        </el-row>
      </el-container>
		</el-container>
  </div>
</template>

<script>
import Header from '../components/Header'
import CardMe from '../components/card/CardMe'
import ScrollPage from '../components/ScrollPage'
import PostWrite from '../components/post/PostWrite'
import CardHotWorld from '../components/card/CardHotWorld'
import CardHotTopic from '../components/card/CardHotTopic'
import CardHotUser from '../components/card/CardHotUser'

export default {
  name: 'PostHome',

  components: {
  	'component-header': Header,
    'card-me': CardMe,
    'scroll-page': ScrollPage,
    'post-write': PostWrite,
    'card-hot-world': CardHotWorld,
    'card-hot-topic': CardHotTopic,
    'card-hot-user': CardHotUser
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
</style>
