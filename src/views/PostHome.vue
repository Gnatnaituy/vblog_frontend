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
            <card-hot-word style="position: relative"></card-hot-word>
          </el-col>

          <!-- post write & content board -->
          <el-col :span="10" style="padding: 0 10px 10px 10px">
            <post-write v-if="this.logged()"></post-write>
            <scroll-page></scroll-page>
          </el-col>

          <!-- current user info & user recommends -->
          <el-col :span="5">
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
import { mapGetters } from 'vuex'

export default {
  name: 'PostHome',

  components: {
  	'component-header': Header,
    'scroll-page': ScrollPage,
    'post-write': PostWrite,
    'card-hot-word': CardHotWord,
    'card-hot-topic': CardHotTopic,
    'card-hot-user': CardHotUser
  },

  methods: {
    ...mapGetters(['logged'])
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
