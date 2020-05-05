<template>
  <el-card class="card-topic">
    <div class="demo-image">
      <el-image class="card-topic-background" :src="currentTopic.background"></el-image>
    </div>

    <div class="topic-information">
      <div>
        <div class="text item topic-information-item">
          <b>名称</b>:
          <p class="topic-information-value">
            {{ currentTopic.name }}
          </p>
        </div>
        <div class="text item topic-information-item">
          <b>创建人</b>:
          <el-link type="primary" :underline="false" class="topic-information-value"
                   v-on:click="userPage(currentTopic.createUser.id)">
            {{ currentTopic.createUser.nickname }}
          </el-link>
        </div>
        <div class="text item topic-information-item">
          <b>创建时间</b>:
          <p class="topic-information-value" style="margin-top: 2px">
            {{ formatTime(currentTopic.createTime) }}
          </p>
        </div>
        <div class="text item topic-information-item">
          <b>描述</b>:
          <p class="topic-information-value">
            {{ currentTopic.description }}
          </p>
        </div>

        <el-divider></el-divider>
        <div class="text item topic-information-item">
          <b>活跃用户</b>
          <div>
            <el-link type="primary" :underline=false style="padding: 2px"
                     v-for="user in currentTopic.activeUsers" v-bind:key="user.id"
                     v-on:click="userPage(user.id)">
              <el-avatar :src="user.avatar" size='small' @click="userPage(currentTopic.createUser.id)">
              </el-avatar>
            </el-link>
          </div>
        </div>

        <el-divider v-if="this.logged()"></el-divider>
        <div v-if="this.logged()">
          <el-button size="mini" plain class="topic-operation-button"
                     v-if="currentTopic.createUser.id === token.userId"
                     @click="toggleUpdateTopicInfoDialog()">
            编辑话题信息
          </el-button>
        </div>
        <el-dialog width="30%" :show-close="false" :visible.sync="updateTopicInfoDialogVisibility">
          <div style="height: 160px;">
            <el-upload class="background-uploader" action="/open/upload/image/topic-background"
                       accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                       :show-file-list="false"
                       :on-success="uploadBackgroundSuccess">
              <img :src="currentTopic.background" class="background" alt="背景图">
            </el-upload>
          </div>
          <div style="padding: 10px 0 0 0">
            <el-input size="mini" v-model="currentTopic.description"></el-input>
            <el-button size="mini" class="edit-info-bottom" @click="toggleUpdateTopicInfoDialog()">取消</el-button>
            <el-button size="mini" class="edit-info-bottom" @click="updateTopicInfo()">保存</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </el-card>
</template>

<script>
  import axios from 'axios'
  import { formatTime } from '../../utils/time';
  import { mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'CardTopic',

    data() {
      return {
        updateTopicInfoDialogVisibility: false
      }
    },

    computed: {
      ...mapState(['token', 'currentTopic'])
    },

    methods: {
      ...mapGetters(['logged']),
      ...mapActions(['user']),
      userPage(userId) {
        this.user(userId)
        if (this.$route.path !== '/user') {
          this.$router.push({path: '/user'})
        }
      },

      toggleUpdateTopicInfoDialog() {
        this.updateTopicInfoDialogVisibility = !this.updateTopicInfoDialogVisibility
      },
      uploadBackgroundSuccess(res) {
        if (res.code === '1') {
          this.currentTopic.background = res.data
        }
      },
      updateTopicInfo() {
        axios.post('/post/topic/update', {
          topicId: this.currentTopic.id,
          description: this.currentTopic.description,
          background: this.currentTopic.background
        }).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.toggleUpdateTopicInfoDialog()
            this.$store.commit('changeCurrentTopic', this.currentTopic)
          }
        })
      },

      formatTime(time) {
        return formatTime(time);
      }
    }
  }
</script>

<style scoped>
  .card-topic {
    box-shadow: none;
  }

  .card-topic-background {
    width: 115%;
    height: 100%;
    margin: -20px -20px 0 -20px;
  }

  .topic-information {
    width: 100%;
    font-size: 14px;
    display: inline-block;
  }
  .topic-information-item {
    padding-top: 5px;
  }
  .topic-information-value {
    float: right;
  }
  .topic-operation-button {
    width: 100%;
    margin-top: 5px;
  }
  .background-uploader {
    width: 100%;
    float: right;
    margin-bottom: 20px;
  }
  .background-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: right;
    margin-right: 0;
  }
  .background {
    width: 100%;
    height: 200px;
    float: right;
    display: block;
    border-radius: 4px;
  }
  .edit-info-bottom {
    margin-top: 20px;
    width: 48%;
  }
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 14px 0 4px 0;
  }
</style>
