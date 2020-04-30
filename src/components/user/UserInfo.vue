<template>
  <el-popover placement="top" width="200" trigger="click">
    <div style="display: flex; flex-direction: row">
      <el-avatar :src="userInfo.avatar"></el-avatar>
      <span style="padding: 12px 0 0 10px">{{ userInfo.username }}</span>
    </div>
    <div class="text item" style="padding: 5px 0 0 50px">性别: {{ userInfo.gender }}</div>
    <div class="text item" style="padding: 5px 0 0 50px">签名: {{ userInfo.bio }}</div>
    <el-button type="text" slot="reference" style="padding: 0">{{ userInfo.nickname }}</el-button>
  </el-popover>
</template>

<script>
export default {
  name: "UserInfo",

  props: {
    userInfo: Object
  }
};
</script>

<style scoped>
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100px;
  width: 100%;
  margin: 0 0 5px 50px;
}
</style>
