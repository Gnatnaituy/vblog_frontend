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
            <scroll-page></scroll-page>
          </el-col>

        </el-row>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header";
import ScrollPage from "../components/ScrollPage";
import CardHotWord from '../components/post/CardHotWord'

export default {
  name: "SearchHome",

  components: {
    "component-header": Header,
    "scroll-page": ScrollPage,
    "card-hot-word": CardHotWord
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
</style>
