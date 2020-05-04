<template>
  <el-card class="card-user">
    <div class="demo-image">
      <el-image class="card-user-background" :src="currentUser.background"></el-image>
    </div>

    <div class="user-information">
      <div class="user-information-header">
        <el-avatar class="user-information-header-avatar" :src="currentUser.avatar"></el-avatar>
        <div class="user-information-header-content">
          <div class="text item user-information-header-item">
            {{ currentUser.username + ' / ' + currentUser.nickname }}
          </div>
        </div>
      </div>

      <div class="user-information-content">
        <div class="text item user-information-item">
          <b>性别</b>:
          <p class="user-information-value" v-show="currentUser.gender !== null">
            {{ currentUser.gender }}
          </p>
          <p class="user-information-value" v-show="currentUser.gender === null">
            未填写
          </p>
        </div>
        <div class="text item user-information-item">
          <b>年龄</b>:
          <p class="user-information-value" style="margin-top: 2px" v-show="currentUser.bio !== null">
            {{ currentUser.age }}
          </p>
          <p class="user-information-value" v-show="currentUser.age === null">
            未填写
          </p>
        </div>
        <div class="text item user-information-item">
          <b>签名</b>:
          <p class="user-information-value" v-show="currentUser.bio !== null">
            {{ currentUser.bio }}
          </p>
          <p class="user-information-value" v-show="currentUser.bio === null">
            未填写
          </p>
        </div>
        <div class="text item user-information-item">
          <b>注册时间</b>:
          <p class="user-information-value" style="margin-top: 2px">
            {{ formatTime(currentUser.registerTime) }}
          </p>
        </div>

        <el-divider></el-divider>
        <div class="text item user-information-item">
          <b v-show="currentUser.id === token.userId">我的话题</b>
          <b v-show="currentUser.id !== token.userId">他的话题</b>
          <div>
            <el-link class="user-information-topic" type="primary" :underline=false
                     v-for="topic in currentUser.topics" :key="topic.id"
                     @click="topicPage(topic.id)">
              {{ '#' + topic.name }}
            </el-link>
          </div>
        </div>

        <el-divider></el-divider>
        <div class="text item user-information-item">
          <b v-show="currentUser.id === token.userId">我的词条</b>
          <b v-show="currentUser.id !== token.userId">他的词条</b>
          <div>
            <el-link class="user-information-word" type="primary" :underline=false
                     v-for="word in currentUser.words" :key="word"
                     @click="postPage(word)">
              {{ word }}
            </el-link>
          </div>
        </div>

        <el-divider v-if="this.logged()"></el-divider>
        <div class="text item user-information-item">
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.blocked === false && currentUser.friendStatus !== 'IS_FRIEND'"
                     @click="blockUser()">
            屏蔽用户
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.blocked === true"
                     @click="unblockUser()">
            取消屏蔽
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.friendStatus === 'NOT_FRIEND'"
                     @click="addDialogVisible = true">
            添加好友
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.friendStatus === 'IS_FRIEND'"
                     @click="deleteFriend()">
            删除好友
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.friendStatus === 'REQUEST_SEND'"
                    :disabled="true">
            已发送好友请求
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.friendStatus === 'REQUEST_DENIED'"
                     @click="addDialogVisible = true">
            好友请求被拒绝
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.friendStatus === 'IS_FRIEND'"
                     @click="changeRemarkAndVisibility()">
            修改备注和权限
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="token.userId === currentUser.id">
            修改资料
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="token.userId === currentUser.id"
                     @click="clearToken()">
            退出登录
          </el-button>
        </div>

        <!-- remark and visibility dialog when send friend request -->
        <el-dialog title="添加好友" width="400px" :show-close="false" :center="true" :visible.sync="addDialogVisible">
          <el-form :model="friendAddVo">
            <el-form-item label="好友备注" :label-width="formLabelWidth">
              <el-input size="small" v-model="friendAddVo.senderRemark" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="好友权限" :label-width="formLabelWidth">
              <el-select size="small" v-model="friendAddVo.senderVisibility" placeholder="默认双方可见">
                <el-option label="双方可见" value="1"></el-option>
                <el-option label="不看他的动态" value="2"></el-option>
                <el-option label="不让他看我的动态" value="3"></el-option>
                <el-option label="互相不可见" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="user-add-friend-footer">
            <el-button size="mini" plain class="user-operation-button" @click="closeAddDialog()">取消</el-button>
            <el-button size="mini" plain class="user-operation-button" @click="sendFriendRequest()">发送好友请求</el-button>
          </div>
        </el-dialog>

        <!-- remark and visibility dialog when modify -->
        <el-dialog title="修改备注和权限" width="400px" :show-close="false" :center="true" :visible.sync="modifyDialogVisible">
          <el-form :model="changeRemarkAndVisibilityVo">
            <el-form-item label="好友备注" :label-width="formLabelWidth">
              <el-input size="small" v-model="changeRemarkAndVisibilityVo.remark" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="好友权限" :label-width="formLabelWidth">
              <el-select size="small" v-model="changeRemarkAndVisibilityVo.visibility" placeholder="默认双方可见">
                <el-option label="双方可见" value="1"></el-option>
                <el-option label="不看他的动态" value="2"></el-option>
                <el-option label="不让他看我的动态" value="3"></el-option>
                <el-option label="互相不可见" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="user-add-friend-footer">
            <el-button size="mini" plain class="user-operation-button" @click="closeModifyDialog()">取消</el-button>
            <el-button size="mini" plain class="user-operation-button" @click="changeRemarkAndVisibility()">保存修改</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </el-card>
</template>

<script>
  import axios from 'axios'
  import { formatTime } from '../../utils/time';
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'CardUser',

    data() {
      return {
        addDialogVisible: false,
        modifyDialogVisible: false,
        formLabelWidth: '80px',
        friendAddVo: {
          senderId: this.$store.state.token.userId,
          senderRemark: null,
          senderVisibility: "1",
          receiverId: this.$store.state.currentUser.id
        },
        changeRemarkAndVisibilityVo: {
          userId: this.$store.state.token.userId,
          friendId: this.$store.state.currentUser.id,
          remark: null,
          visibility: null
        },
        deleteFriendVo: {
          userId: this.$store.state.token.userId,
          friendId: this.$store.state.currentUser.id
        },
        blockVo: {
          blockUserId: this.$store.state.currentUser.id
        }
      }
    },

    computed: {
      ...mapState(['token', 'currentUser'])
    },

    methods: {
      ...mapGetters(['logged']),
      ...mapMutations(['clearToken']),
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

      sendFriendRequest() {
        this.addDialogVisible = false
        axios.post('/user/friend/request/send', this.friendAddVo).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.$store.state.currentUser.friendStatus = 'REQUEST_SEND'
            this.$store.commit('changeCurrentUser', this.$store.state.currentUser)
          }
        })
      },
      closeAddDialog() {
        this.addDialogVisible = false
      },

      changeRemarkAndVisibility() {
        this.modifyDialogVisible = false
        if (this.changeRemarkAndVisibilityVo.remark !== null) {
          axios.post('/user/friend/remark', this.changeRemarkAndVisibilityVo)
        }
        if (this.changeRemarkAndVisibilityVo.visibility !== null) {
          axios.post('/user/friend/visibility', this.changeRemarkAndVisibilityVo)
        }
      },
      closeModifyDialog() {
        this.modifyDialogVisible = false
        this.changeRemarkAndVisibilityVo.remark = null
        this.changeRemarkAndVisibilityVo.visibility = null
      },

      deleteFriend() {
        axios.post('/user/friend/delete', this.deleteFriendVo).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.$store.state.currentUser.friendStatus = 'NOT_FRIEND'
            this.$store.commit('changeCurrentUser', this.$store.state.currentUser)
          }
        })
      },

      blockUser() {
        axios.post('/user/block/block', this.blockVo).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.$store.state.currentUser.blocked = true
            this.$store.commit('changeCurrentUser', this.$store.state.currentUser)
          }
        })
      },
      unblockUser() {
        axios.post('/user/block/unblock', this.blockVo).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.$store.state.currentUser.blocked = false
            this.$store.commit('changeCurrentUser', this.$store.state.currentUser)
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
  .card-user {
    box-shadow: none;
  }

  .card-user-background {
    width: 115%;
    height: 100%;
    margin: -20px -20px 0 -20px;
  }
  .user-information {
    width: 100%;
    font-size: 14px;
    display: inline-block;
  }
  .user-information-header-avatar {
    margin: 6px 0 0 -6px;
  }
  .user-information-header-content {
    margin: -30px 0 10px 40px;
  }
  .user-information-header-item {
    padding-top: 0;
  }
  .user-information-content {
    margin: 0;
  }
  .user-information-item {
    padding-top: 3px;
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
  .user-operation-button {
    width: 47%;
    margin-top: 5px;
  }
  .user-add-friend-footer {
    padding: 0;
  }
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 14px 0 4px 0;
  }
  .el-dialog__header {
    padding: 5px;
  }
</style>
