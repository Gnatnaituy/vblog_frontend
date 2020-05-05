<template>
  <div class="message-item">
    <!-- message for receiver -->
    <div v-if="friendRequest.receiver.id === token.userId">
      <el-link :underline=false class="message-item-text" type="primary"
               v-on:click="userPage(friendRequest.sender.id)">
        {{ friendRequest.sender.nickname }}
      </el-link>
      <el-link :underline=false class="message-item-text" v-on:click="changeOperationVisibility()">
        请求添加你为好友
      </el-link>
      <span class="message-time">
          {{ formatTime(friendRequest.sendTime) }}
        </span>
    </div>
    <!-- operations for receiver -->
    <div v-if="friendRequest.receiver.id === token.userId">
      <div v-show="friendRequest.requestStatus === 'FRIEND_REQUEST_STATUS_001' && showOperations === true"
           class="message-operation">
        <el-link :underline=false class="message-item-operation" type="primary"
                 v-on:click="changeAcceptFormVisibility()">
          同意
        </el-link>
        <el-link :underline=false class="message-item-operation" type="primary"
                 @click="deny(friendRequest.id)">
          拒绝
        </el-link>
        <el-link :underline=false class="message-item-operation" type="primary"
                 @click="ignore(friendRequest.id)">
          忽略
        </el-link>
      </div>

      <!-- remark and visibility form when accept a friend request -->
      <el-form :inline="true" :model="acceptFriendRequestVo" v-show="showAcceptForm" size="mini">
        <el-form-item>
          <el-input v-model="acceptFriendRequestVo.accepterRemark" placeholder="好友备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="acceptFriendRequestVo.accepterVisibility" placeholder="默认双方可见">
            <el-option label="双方可见" value="1"></el-option>
            <el-option label="不看他的动态" value="2"></el-option>
            <el-option label="不让他看我的动态" value="3"></el-option>
            <el-option label="互相不可见" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" v-on:click="accept(friendRequest.id)">保存</el-button>
        </el-form-item>
      </el-form>

      <div v-if="friendRequest.requestStatus === 'FRIEND_REQUEST_STATUS_002'"
           class="message-operation">
        <el-link :underline=false :disabled="true" class="message-item-operation">
          已添加
        </el-link>
      </div>
      <div v-if="friendRequest.requestStatus === 'FRIEND_REQUEST_STATUS_003'"
           class="message-operation">
        <el-link :underline=false :disabled="true" class="message-item-operation">
          已拒绝
        </el-link>
      </div>
      <div v-if="friendRequest.requestStatus === 'FRIEND_REQUEST_STATUS_004'"
           class="message-operation">
        <el-link :underline=false :disabled="true" class="message-item-operation">
          已忽略
        </el-link>
      </div>
    </div>

    <!-- message for sender -->
    <div v-if="friendRequest.sender.id === token.userId">
      <el-link v-if="friendRequest.requestStatus === 'FRIEND_REQUEST_STATUS_002'
                 || friendRequest.requestStatus === 'FRIEND_REQUEST_STATUS_003'"
               :underline=false class="message-item-text" type="primary"
               v-on:click="userPage(friendRequest.receiver.id)">
        {{ friendRequest.receiver.nickname }}
      </el-link>
      <el-link v-if="friendRequest.requestStatus === 'FRIEND_REQUEST_STATUS_002'"
               :underline=false class="message-item-text">
        同意了你的好友请求
      </el-link>
      <span v-if="friendRequest.requestStatus === 'FRIEND_REQUEST_STATUS_002'"
            class="message-time">
          {{ formatTime(friendRequest.acceptTime) }}
        </span>
      <el-link v-if="friendRequest.requestStatus === 'FRIEND_REQUEST_STATUS_003'"
               :underline=false class="message-item-text">
        拒绝了你的好友请求
      </el-link>
      <span v-if="friendRequest.requestStatus === 'FRIEND_REQUEST_STATUS_003'"
            class="message-time">
          {{ formatTime(friendRequest.denyTime) }}
        </span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState, mapActions } from 'vuex'
  import { formatTime } from "../../utils/time";

  export default {
    name: "MessageFriendRequestItem",

    props: {
      friendRequest: {
        id: null,
        sender: {
          id: null,
          avatar: null,
          nickname: null
        },
        receiver: {
          id: null,
          avatar: null,
          nickname: null
        },
        requestStatus: null,
        sendTime: null,
        acceptTime: null,
        denyTime: null,
        ignoreTime: null
      }
    },

    data() {
      return {
        showOperations: false,
        showAcceptForm: false,
        acceptFriendRequestVo: {
          friendRequestId: null,
          accepterRemark: null,
          accepterVisibility: "1",
        }
      }
    },

    computed: {
      ...mapState(['token', 'friendRequests'])
    },

    methods: {
      ...mapActions(['user']),
      userPage(userId) {
        this.user(userId)
        if (this.$route.path !== '/user') {
          this.$router.push({path: '/user'})
        }
      },
      accept(friendRequestId) {
        this.acceptFriendRequestVo.friendRequestId = friendRequestId
        axios.post('/user/friend/request/accept', this.acceptFriendRequestVo).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.changeAcceptFormVisibility()
            this.changeOperationVisibility()
            this.changeStatus(friendRequestId, 'FRIEND_REQUEST_STATUS_002')
          }
        })
      },
      deny(friendRequestId) {
        axios.post(`/user/friend/request/deny/${friendRequestId}`).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.changeOperationVisibility()
            this.changeStatus(friendRequestId, 'FRIEND_REQUEST_STATUS_003')
          }
        })
      },
      ignore(friendRequestId) {
        axios.post(`/user/friend/request/ignore/${friendRequestId}`).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.changeOperationVisibility()
            this.changeStatus(friendRequestId, 'FRIEND_REQUEST_STATUS_004')
          }
        })
      },
      changeStatus(id, status) {
        this.$store.state.friendRequests.filter(o => o.id === id).map(o => o.requestStatus = status)
        this.$store.commit('initFriendRequests', this.$store.state.friendRequests)
      },
      changeOperationVisibility() {
        this.showOperations = !this.showOperations
        if (this.showOperations === false && this.showAcceptForm === true) {
          this.showAcceptForm = false
        }
      },
      changeAcceptFormVisibility() {
        this.showAcceptForm = !this.showAcceptForm
      },

      formatTime(time) {
        return formatTime(time);
      }
    }
  }
</script>

<style scoped>
  .message-item {
    padding: 0;
  }
  .message-item-text {
    font-weight: normal;
    font-size: 13px;
  }
  .message-operation {
    text-align: right;
  }
  .message-item-operation {
    font-weight: normal;
    font-size: 13px;
    align-content: end;
  }
  .message-time {
    padding: 2px 0 0 0;
    font-size: 11px;
    color: #606266;
    float: right;
  }
  .message-item >>> .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0;
    padding-right: 1px;
  }
  .message-item >>> .el-form--inline .el-form-item {
    display: inline-block;
    margin-right: 0;
    vertical-align: top;
  }
  .message-item >>> .el-form-item {
    margin-bottom: 0;
  }
</style>
