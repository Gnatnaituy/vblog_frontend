<template>
  <el-card class="card-hot-word">
    <div slot="header" class="">
      <span>热门词条</span>
    </div>
    <div v-for="word in this.hotWords" :key="word.word">
      <el-tag size="medium" effect="plain" class="hot-word" @click="postPage(word.word)">
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
  margin-bottom: 10px;
}
.hot-word {
  float: left;
  margin: 2px
}
</style>
