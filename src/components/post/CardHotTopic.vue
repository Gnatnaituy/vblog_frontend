<template>
  <el-card class="card-hot-topic">
    <b>热门话题</b>
    <el-divider></el-divider>
    <div class="hot-topic-content">
      <el-tag size="medium" effect="plain" class="hot-topic-item"
              v-for="topic in hotTopics" :key="topic.topic.id"
              @click="topicPage(topic.topic.id)">
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
    margin: 0 0 10px 0;
  }
  .hot-topic-content {
    padding: 6px 0 0 0;
    width: 100%;
    min-height: 120px;
  }
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 4px 0;
  }
  .hot-topic-item {
    float: left;
    margin: 2px
  }
</style>
