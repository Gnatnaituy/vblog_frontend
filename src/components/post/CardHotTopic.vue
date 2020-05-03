<template>
  <el-card class="card-hot-topic">
    <div slot="header" class="">
      <span>热门话题</span>
    </div>
    <div v-for="topic in hotTopics" :key="topic.topic.id">
      <el-tag size="medium" effect="plain" class="hot-topic" @click="topicPage(topic.topic.id)">
        <el-link type="primary" :underline=false style="font-weight: 400; font-size: 12px">
          {{ '#' + topic.topic.name + ' ' + topic.count }}
        </el-link>
      </el-tag>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CardHotTopic',

  data() {
    return {
      aggregationVo: {
        field: 'topics',
        size: 10
      }
    }
  },

  computed: {
    ...mapState(['hotTopics'])
  },

  mounted() {
    axios.post('/open/post/hot-topics', this.aggregationVo).then(res => {
      if (res.status === 200 && res.data.code === '1') {
        this.$store.commit('initHotTopics', res.data.data)
      }
    })
  },

  methods: {
    ...mapActions(['topic']),

    topicPage(topicId) {
      this.topic(topicId)
      if (this.$route.path !== '/topic') {
        this.$router.push({path: '/topic'})
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
