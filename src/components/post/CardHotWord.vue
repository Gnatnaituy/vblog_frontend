<template>
  <el-card class="card-hot-word">
    <b>热门词条</b>
    <el-divider></el-divider>
    <div class="hot-topic-content">
      <el-tag size="medium" effect="plain" class="hot-word-item"
              v-for="word in this.hotWords" :key="word.word"
              @click="postPage(word.word)">
        <el-link type="primary" :underline=false style="font-weight: 400; font-size: 12px">
          {{ word.word + ' ' + word.count }}
        </el-link>
      </el-tag>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CardHotWord',

  data() {
    return {
      aggregationVo: {
        field: 'content',
        size: 30
      }
    }
  },

  computed: {
    ...mapState(['hotWords'])
  },

  mounted() {
    axios.post('/open/post/hot-words', this.aggregationVo).then(res => {
      if (res.status === 200 && res.data.code === '1') {
        this.$store.commit('initHotWords', res.data.data)
      }
    })
  },

  methods: {
    ...mapActions(['post']),

    postPage(keyword) {
      this.post(keyword)
      if (this.$route.path !== '/post') {
        this.$router.push({path: '/post'})
      }
    }
  }
}
</script>

<style scoped>
  .card-hot-word {
    box-shadow: none;
    margin: 0 0 10px 0;
  }
  .hot-topic-content {
    padding: 6px 0 0 0;
    width: 100%;
    min-height: 300px;
  }
  .hot-word-item {
    float: left;
    margin: 2px
  }
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 4px 0;
  }
</style>
