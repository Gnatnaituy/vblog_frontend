<template>
  <el-card class="card-hot-world">
    <div slot="header" class="">
      <span>热门词条</span>
    </div>
    <div v-for="world in hotWorlds" :key="world.key">
      <el-button plain round size="mini" class="hot-world" @click="clickHotWorld(world)">{{ world.key + ' ' + world.docCount }}</el-button>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: "CardHotWorld",

  data() {
    return {
      aggregationVo: {
        field: "content",
        size: 35
      }
    }
  },

  computed: {
    ...mapState([
      "hotWorlds",
      "searchVo"
    ])
  },

  mounted() {
    axios.post("/open/post/hot-worlds", this.aggregationVo).then(res => {
      if (res.status === 200 && res.data.code === '1') {
        this.$store.commit('initHotWorlds', res.data.data)
      }
    })
  },

  methods: {
    clickHotWorld(world) {
      this.searchVo.start = 0
      this.searchVo.keyword = world.key
      this.searchVo.poster = null
      this.$store.commit('changeSearchVo', this.searchVo)
      this.$store.commit('changeNoNewPosts', false)
      this.$store.commit('clearPosts')
      if (this.$route.path !== '/search') {
        this.$router.push({path:'/search'})
      }
    }
  }
}
</script>

<style scoped>
.card-hot-world {
  box-shadow: none;
}
.hot-world-content {
  margin-bottom: 20px;
}
.hot-world {
  float: left;
  margin: 0 2px
}
</style>