<template>
  <div id="home">
    <el-container>

      <component-header></component-header>

      <el-container style="margin-top: 70px">
        <el-row style="width: 100%">

          <el-col :span="5" :offset="2">
            <card-hot-word style="position: relative"></card-hot-word>
          </el-col>

          <el-col :span="10" style="padding: 0 10px 10px 10px">
            <div class="text item vblog-search-result"> <b>搜索结果</b> </div>
            <scroll-page></scroll-page>
          </el-col>

          <el-col :span="5">

          </el-col>

        </el-row>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import Header from '../components/Header';
import ScrollPage from '../components/ScrollPage';
import CardHotWord from '../components/post/CardHotWord'
import CardUser from '../components/user/CardUser';
import { mapGetters } from 'vuex';

export default {
  name: 'SearchHome',

  components: {
    'component-header': Header,
    'scroll-page': ScrollPage,
    'card-hot-word': CardHotWord,
    'card-user': CardUser
  },

  methods: {
    ...mapGetters(['logged'])
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
.vblog-search-result {
  padding: 0 5px 5px 5px;
  color: rgb(70, 70, 70);
}
</style>
