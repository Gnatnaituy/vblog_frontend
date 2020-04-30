<template>
  <div id="home">
    <el-container>
      <!-- header -->
      <component-header></component-header>
      <el-container style="margin-top: 70px">
        <el-row style="width: 100%">
          <el-col :span="5" :offset="2">
            <card-hot-world style="position: relative"></card-hot-world>
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
import CardHotWorld from '../components/card/CardHotWorld'

export default {
  name: "SearchHome",
  
  components: {
    "component-header": Header,
    "scroll-page": ScrollPage,
    "card-hot-world": CardHotWorld
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
