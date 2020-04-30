<template>
  <el-card class="card-hot-topic">
    <div slot="header" class="">
      <span>热门话题</span>
    </div>
    <div v-for="topic in hotTopics" :key="topic.topic.id">
      <el-tag size="medium" effect="plain" class="hot-topic" @click="clickHotTopic(topic)">
        {{ '#' + topic.topic.name + ' ' + topic.count }}
      </el-tag>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: "CardHotTopic",

  data() {
    return {
      aggregationVo: {
        field: "topics",
        size: 10
      }
    }
  },

  computed: {
    ...mapState([
      "hotTopics",
      "searchVo"
    ])
  },

  mounted() {
    axios.post("/open/post/hot-topics", this.aggregationVo).then(res => {
      if (res.status === 200 && res.data.code === '1') {
        this.$store.commit('initHotTopics', res.data.data)
      }
    })
  },

  methods: {
    clickHotTopic(topic) {
      this.searchVo.start = 0
      this.searchVo.keyword = topic.topic.name
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
.card-hot-topic {
  box-shadow: none;
  margin-bottom: 10px;
}
.hot-topic-content {
  margin-bottom: 20px;
}
.hot-topic {
  float: left;
  margin: 2px
}
</style>