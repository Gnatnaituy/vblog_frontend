<template>
  <div id="home">
    <el-container>
      <!-- header -->
    	<component-header></component-header>
      <el-container style="margin-top: 70px">
        <el-row style="width: 100%">
          <el-col :span="5" :offset="2">
            <card-me style="position: relative"></card-me>
          </el-col>

          <el-col :span="10" style="padding: 0 10px 10px 10px">
            <post-write></post-write>
            <scroll-page></scroll-page>
          </el-col>

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

export default {
  name: 'Home',

  data () {
  	return {}
  },

  methods: {
    refreshPosts() {
      this.$children[0].loadPosts
    }
  },

  components: {
  	'component-header': Header,
    'card-me': CardMe,
    'scroll-page': ScrollPage,
    'post-write': PostWrite
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
