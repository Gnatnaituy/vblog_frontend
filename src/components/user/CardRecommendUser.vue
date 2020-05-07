<template>
  <el-card class="card-user">
    <b>推荐用户</b>
    <el-divider></el-divider>

    <div v-if="recommendUser !== null" class="user-information">
      <div class="user-information-header">
        <el-avatar class="user-information-header-avatar" :src="recommendUser.avatar"></el-avatar>
        <div class="user-information-header-content">
          <div class="text item user-information-header-item">
            {{ recommendUser.nickname }}
          </div>
        </div>
      </div>

      <div class="user-information-content">
        <div class="text item user-information-item">
          <b>性别</b>:
          <p class="user-information-value" v-show="recommendUser.gender !== null">
            {{ recommendUser.gender }}
          </p>
          <p class="user-information-value" v-show="recommendUser.gender === null">
            未填写
          </p>
        </div>
        <div class="text item user-information-item">
          <b>年龄</b>:
          <p class="user-information-value" v-show="recommendUser.bio !== null" style="margin-top: 2px" >
            {{ recommendUser.age }}
          </p>
          <p class="user-information-value" v-show="recommendUser.age === null">
            未填写
          </p>
        </div>
        <div class="text item user-information-item">
          <b>签名</b>:
          <p class="user-information-value" v-show="recommendUser.bio !== null">
            {{ recommendUser.bio }}
          </p>
          <p class="user-information-value" v-show="recommendUser.bio === null">
            未填写
          </p>
        </div>
        <div class="text item user-information-item">
          <b>注册时间</b>:
          <p class="user-information-value" style="margin-top: 2px">
            {{ formatTime(recommendUser.registerTime) }}
          </p>
        </div>
      </div>

      <el-divider></el-divider>
      <div class="text item user-information-item">
        <b>他活跃的话题</b>
        <div>
          <el-link class="user-information-topic" type="primary" :underline=false
                   v-for="topic in recommendUser.topics" :key="topic.id"
                   @click="topicPage(topic.id)">
            {{ '#' + topic.name }}
          </el-link>
        </div>
      </div>

      <el-divider></el-divider>
      <div class="text item user-information-item">
        <b>他的词条</b>
        <div>
          <el-link class="user-information-word" type="primary" :underline=false
                   v-for="(word, index) in recommendUser.words" :key="word"
                   @click="postPage(word)">
            {{ word }}<i v-if="index !== recommendUser.words.length - 1">、</i>
          </el-link>
        </div>
      </div>
    </div>

    <div v-else>
      <div style="text-align: center; color: gray; margin-top: 16px">
        暂无推荐用户, 多发点动态就有了
      </div>
    </div>
  </el-card>
</template>

<script>
  import axios from 'axios'
  import { formatTime } from '../../utils/time';
  import { mapActions } from 'vuex'

  export default {
    name: "CardRecommendUser",

    data() {
      return {
        recommendUser: null
      }
    },

    mounted() {
      axios.get('/open/user/recommend').then(res => {
        if (res.status === 200 && res.data.code === '1') {
          this.recommendUser = res.data.data
        }
      })
    },

    methods: {
      ...mapActions(['post', 'topic']),
      postPage(keyword) {
        this.post(keyword)
        if (this.$route.path !== '/post') {
          this.$router.push({path: '/post'})
        }
      },
      topicPage(topicId) {
        this.topic(topicId)
        if (this.$route.path !== '/topic') {
          this.$router.push({path: '/topic'})
        }
      },
      formatTime(time) {
        return formatTime(time);
      }
    }
  }
</script>

<style scoped>
  .card-user {
    box-shadow: none;
  }
  .user-information {
    width: 100%;
    font-size: 14px;
    display: inline-block;
  }
  .user-information-header-avatar {
    margin: 6px 0 0 0;
  }
  .user-information-header-content {
    margin: -30px 0 10px 50px;
    font-weight: 500;
  }
  .user-information-header-item {
    padding-top: 0;
  }
  .user-information-content {
    margin: 0;
  }
  .user-information-item {
    padding: 3px 0 0 0;
  }
  .user-information-value {
    float: right;
  }
  .user-information-topic {
    font-weight: 500;
    font-size: 13px;
    margin: 4px 4px 0 0;
  }
  .user-information-word {
    font-weight: 500;
    font-size: 13px;
    margin: 4px 4px 0 0;
  }
</style>
