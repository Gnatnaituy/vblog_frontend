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
            {{ currentUser.nickname }}
          </div>
        </div>
      </div>

      <div class="user-information-content">
        <div class="text item user-information-item">
          <b>邮箱</b>:
          <p class="user-information-value" v-show="currentUser.email !== null" style="margin-top: 2px" >
            {{ currentUser.email }}
          </p>
          <p class="user-information-value" v-show="currentUser.email === null">
            未填写
          </p>
        </div>
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
          <p class="user-information-value" v-show="currentUser.bio !== null" style="margin-top: 2px" >
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
          <b v-show="currentUser.id === token.userId">我活跃的的话题</b>
          <b v-show="currentUser.id !== token.userId">他活跃的的话题</b>
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
        <div v-if="this.logged() && token.userId !== currentUser.id" class="text item user-information-item">
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.blocked === false && currentUser.friendStatus !== 'IS_FRIEND'"
                     @click="blockUser()">
            屏蔽用户
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.blocked === true && currentUser.friendStatus !== 'IS_FRIEND'"
                     @click="unblockUser()">
            取消屏蔽
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.friendStatus === null || currentUser.friendStatus === 'NOT_FRIEND'"
                     @click="toggleAddFriendForm()">
            添加好友
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.friendStatus === 'IS_FRIEND'"
                     @click="deleteFriend()">
            删除好友
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.friendStatus === 'IS_FRIEND'"
                     @click="toggleModifyRemarkAndVisibilityForm()">
            修改备注和权限
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.friendStatus === 'REQUEST_SEND'"
                    :disabled="true">
            已发送好友请求
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     v-if="currentUser.friendStatus === 'REQUEST_DENIED'"
                     @click="toggleAddFriendForm()">
            好友请求被拒绝
          </el-button>
        </div>
        <div v-if="this.logged() && token.userId === currentUser.id" class="text item user-information-item">
          <el-button size="mini" plain class="user-operation-button"
                     @click="clearToken()">
            退出登录
          </el-button>
          <el-button size="mini" plain class="user-operation-button"
                     @click="toggleModifyUserInfoDialog()">
            修改资料
          </el-button>
        </div>

        <!-- remark and visibility form when send a friend request -->
        <el-card v-show="addFriendFormVisible" shadow="never">
          <el-form :model="friendAddVo" size="mini">
            <el-form-item>
              <el-input v-model="friendAddVo.senderRemark" placeholder="备注 选填" class="friend-remark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="friendAddVo.senderVisibility" placeholder="好友权限 默认双方可见" class="friend-visibility">
                <el-option label="双方可见" value="1"></el-option>
                <el-option label="不看他的动态" value="2"></el-option>
                <el-option label="不让他看我的动态" value="3"></el-option>
                <el-option label="互相不可见" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button plain v-on:click="toggleAddFriendForm()">
                取消
              </el-button>
              <el-button plain v-on:click="sendFriendRequest()" style="float: right">
                发送好友请求
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- modify remark and visibility -->
        <el-card v-show="modifyRemarkAndVisibilityFormVisible" shadow="never">
          <el-form :model="changeRemarkAndVisibilityVo" size="mini">
            <el-form-item>
              <el-input v-model="changeRemarkAndVisibilityVo.remark" placeholder="备注 选填" class="friend-remark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="changeRemarkAndVisibilityVo.visibility" placeholder="好友权限 默认双方可见" class="friend-visibility">
                <el-option label="双方可见" value="1"></el-option>
                <el-option label="不看他的动态" value="2"></el-option>
                <el-option label="不让他看我的动态" value="3"></el-option>
                <el-option label="互相不可见" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button plain v-on:click="toggleModifyRemarkAndVisibilityForm()">取消</el-button>
              <el-button plain v-on:click="changeRemarkAndVisibility()" style="float: right">保存修改</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- update user information dialog -->
        <el-dialog width="30%" :show-close="false" :visible.sync="modifyUserInfoDialogVisible">
          <div style="height: 160px;">
            <el-upload class="avatar-uploader" action="/open/upload/image/user-avatar"
                       accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                       :show-file-list="false"
                       :on-success="uploadAvatarSuccess">
              <img :src="currentUser.avatar" class="avatar" alt="头像">
            </el-upload>
            <el-upload class="background-uploader" action="/open/upload/image/user-background"
                       accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                       :show-file-list="false"
                       :on-success="uploadBackgroundSuccess">
              <img :src="currentUser.background" class="background" alt="背景图">
            </el-upload>
          </div>
          <div style="padding: 10px 0 0 0">
            <el-select size="mini" prefix="性别" v-model="currentUser.gender">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
              <el-option label="保密" value="保密"></el-option>
            </el-select>
            <el-input-number size="mini" v-model="currentUser.age" style="float: right"></el-input-number>
            <el-input size="mini" v-model="currentUser.nickname"><template slot="prepend">昵称</template> </el-input>
            <el-input size="mini" v-model="currentUser.email"><template slot="prepend">邮箱</template> </el-input>
            <el-input size="mini" v-model="currentUser.bio"><template slot="prepend">签名</template> </el-input>
            <el-button size="mini" class="edit-info-bottom" @click="toggleModifyUserInfoDialog()">取消</el-button>
            <el-button size="mini" class="edit-info-bottom" @click="updateUserInfo()">保存</el-button>
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
        // friend related data
        addFriendFormVisible: false,
        modifyRemarkAndVisibilityFormVisible: false,
        editUserInfoMode: false,
        modifyUserInfoDialogVisible: false,
        friendAddVo: {
          senderRemark: null,
          senderVisibility: null
        },
        changeRemarkAndVisibilityVo: {
          remark: null,
          visibility: null
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
        console.log(this.$store.state.token)
        console.log(this.$store.state.currentUser)
        this.addFriendFormVisible = false
        axios.post('/user/friend/request/send', {
          senderId: this.$store.state.token.userId,
          senderRemark: this.friendAddVo.senderRemark,
          senderVisibility: this.friendAddVo.senderVisibility,
          receiverId: this.$store.state.currentUser.id
        }).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.$store.state.currentUser.friendStatus = 'REQUEST_SEND'
            this.$store.commit('changeCurrentUser', this.$store.state.currentUser)
          }
        })
      },
      toggleAddFriendForm() {
        this.addFriendFormVisible = !this.addFriendFormVisible
      },

      changeRemarkAndVisibility() {
        this.modifyRemarkAndVisibilityFormVisible = false
        if (this.changeRemarkAndVisibilityVo.remark !== null) {
          axios.post('/user/friend/remark', {
            userId: this.$store.state.token.userId,
            friendId: this.$store.state.currentUser.id,
            remark: this.changeRemarkAndVisibilityVo.remark
          })
        }
        if (this.changeRemarkAndVisibilityVo.visibility !== null) {
          axios.post('/user/friend/visibility', {
            userId: this.$store.state.token.userId,
            friendId: this.$store.state.currentUser.id,
            visibility: this.changeRemarkAndVisibilityVo.visibility
          })
        }
      },
      toggleModifyRemarkAndVisibilityForm() {
        this.modifyRemarkAndVisibilityFormVisible = !this.modifyRemarkAndVisibilityFormVisible
      },

      deleteFriend() {
        axios.post('/user/friend/delete', {
          userId: this.$store.state.token.userId,
          friendId: this.$store.state.currentUser.id
        }).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.$store.state.currentUser.friendStatus = 'NOT_FRIEND'
            this.$store.commit('changeCurrentUser', this.$store.state.currentUser)
          }
        })
      },

      blockUser() {
        axios.post('/user/block/block', {
          blockUserId: this.$store.state.currentUser.id
        }).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.$store.state.currentUser.blocked = true
            this.$store.commit('changeCurrentUser', this.$store.state.currentUser)
          }
        })
      },
      unblockUser() {
        axios.post('/user/block/unblock', {
          blockUserId: this.$store.state.currentUser.id
        }).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.$store.state.currentUser.blocked = false
            this.$store.commit('changeCurrentUser', this.$store.state.currentUser)
          }
        })
      },

      toggleModifyUserInfoDialog() {
        this.modifyUserInfoDialogVisible = !this.modifyUserInfoDialogVisible
      },
      updateUserInfo() {
        axios.post('/user/account/update', this.currentUser).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.toggleModifyUserInfoDialog()
            this.$store.commit('changeCurrentUser', this.currentUser)
          }
        })
      },
      uploadAvatarSuccess(res) {
        if (res.code === '1') {
          this.currentUser.avatar = res.data
        }
      },
      uploadBackgroundSuccess(res) {
        if (res.code === '1') {
          this.currentUser.background = res.data
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
  .user-operation-button {
    width: 47%;
    margin-top: 5px;
  }
  .friend-remark {
    width: 80%;
    float: right;
  }
  .friend-visibility {
    width: 100%;
    float: right
  }

  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 14px 0 4px 0;
  }

  .avatar-uploader {
    width: 20%;
    float: left;
    margin: 24px 0 10px 12px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 33%;
    float: left;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
  }
  .background-uploader {
    width: 66%;
    float: right;
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
    height: 150px;
    float: right;
    display: block;
    border-radius: 4px;
  }

  .el-input {
    width: 100%;
    padding: 5px 0 0 0;
    font-size: 13px;
  }
  .el-input >>> .el-input__inner {
    background-color: white;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-radius: 0;
    text-align: right;
    padding: 0;
  }

  .edit-info-bottom {
    margin-top: 20px;
    width: 48%;
  }
</style>
