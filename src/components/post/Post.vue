<template>
  <el-card class = "vblog_post">
    <!-- Post header -->
    <div class="vblog_post_header">
      <el-link type="primary" :underline=false style="justify-content: start" v-on:click="userPage(post.poster.id)">
        <el-avatar :src="post.poster.avatar"></el-avatar>
      </el-link>
      <div class="vblog_post_header_content">
        <el-link type="primary" :underline=false style="justify-content: start" v-on:click="userPage(post.poster.id)">
          {{ post.poster.nickname }}
        </el-link>
        <span class="vblog_post_post_time">
          {{ formatTime(post.postTime) }}
        </span>
      </div>
      <i class="el-icon-delete vblog-post-delete" @click="deletePost"
        v-if="token !== null && post.poster.id === token.userId">
      </i>
    </div>

    <!-- Post content -->
    <div class="vblog_post_content">
      <p v-html="post.content">{{ post.content }}</p>
    </div>

    <!-- Post images -->
    <div class="vblog_post_images" v-if="post.images.length !== 0">
      <el-image class="vblog_post_images_item"
        v-for="image in post.images"
        v-bind:key="image.id"
        fit="cover"
        :preview-src-list="post.images.map(image => image.url)"
        :src="image.url">
      </el-image>
    </div>

    <!-- topics -->
    <div class="vblog-post-topics" v-if="post.topics.length > 0">
      <el-link type="primary" :underline=false  style="font-size: 13px"
               v-for="topic in post.topics"
               v-bind:key="topic.id"
               v-on:click="topicPage(topic.id)">
        <strong>#</strong>{{topic.name + '&nbsp&nbsp' }}
      </el-link>
    </div>

    <!-- vote and comment button -->
    <div class="vblog_post_operation_button" v-if="this.$store.getters.logged">
      <el-row>
        <el-button plain round size="mini" @click="saveVote()">赞</el-button>
        <el-button plain round size="mini" @click="toggleComment()">评论</el-button>
      </el-row>
    </div>

    <!-- votes -->
    <div class="vblog_vote" v-if="post.voters.length !== 0">
      <el-link type="primary" :underline=false style="font-size: 13px"
               v-for="voter in post.voters"
               v-bind:key="voter.id"
               v-on:click="userPage(voter.id)">
        {{ voter.nickname + '&nbsp' }}
      </el-link>
      <el-link type="info" :underline=false style="font-weight: 400; font-size: 13px">觉得很赞</el-link>
    </div>
    <div class="vblog_vote" v-else>
      <p>&nbsp;</p>
    </div>

    <!-- comment form -->
      <el-form class="vblog_comment_form" v-show="showComment === true" :inline="true" :model="comment">
        <el-form-item>
          <el-input v-model="comment.content" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain round size="mini" @click="saveComment">评论</el-button>
        </el-form-item>
      </el-form>

    <!-- comments -->
    <div class="vblog_comment" v-if="post.comments.length !== 0">
        <comment-item @refreshComments="refreshComments"
          v-for="comment in post.comments"
          v-bind:key="comment.id"
          :postId="post.id"
          :comment="comment">
        </comment-item>
    </div>
  </el-card>
</template>

<script>
  import axios from 'axios'
  import { formatTime } from '../../utils/time'
  import Comment from './Comment'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Post',

    components: {
      'comment-item': Comment
    },

    props: {
      post: {
        comments: [],
        content: null,
        id: null,
        images: [],
        postTime: null,
        poster: null,
        topics: [],
        voteByMe: null,
        voters: []
      }
    },

    computed: {
      ...mapState(['token'])
    },

    data() {
      return {
        vote: {
          postId: this.post.id,
          disvote: this.post.voteByMe
        },

        comment: {
          postId: this.post.id,
          content: '',
        },

        showComment: false
      }
    },

    methods: {
      ...mapActions(['topic', 'user']),
      topicPage(topicId) {
        this.topic(topicId)
        if (this.$route.path !== '/topic') {
          this.$router.push({path: '/topic'})
        }
      },
      userPage(userId) {
        this.user(userId)
        if (this.$route.path !== '/user') {
          this.$router.push({path: '/user'})
        }
      },
      // Delete post
      deletePost() {
        axios.delete(`/post/${this.post.id}`).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            setTimeout(() => {
              this.$emit("loadPosts")
            }, 1000)
          } else {
            this.$message({
              type: "warning",
              message: "删除失败!",
              showClose: false
            });
          }
        })
      },

      // Save vote and refresh voters of this post after 1s
      saveVote() {
        axios.post('/post/vote/vote', this.vote).then(res => {
          if (res.status === 200 && res.data.code === '1') {
            this.post.voteByMe = !this.post.voteByMe
              this.vote.disvote = this.post.voteByMe
              setTimeout(() => {
                axios.get(`/open/post/voters/${this.post.id}`).then(response => {
                if (response.status === 200) {
                  this.$set(this.post, "voters", response.data.data)
                }
              })}, 1000)
            } else {
              this.$message({
                type: "warning",
                message: "点赞失败!",
                showClose: false
              });
            }
        })
      },

      // Toggle visibility of comment form
      toggleComment() {
        this.showComment = !this.showComment;
      },

      // Save comment and refresh comments of this post
      saveComment() {
        axios.post('/post/comment/save', this.comment).then(res => {
          if (res.status === 200) {
            if (res.data.code === '1') {
              setTimeout(() => {
                this.refreshComments()
                this.comment.content = ''
              }, 1000)
            } else {
              this.$message({
                type: "warning",
                message: res.data.message,
                showClose: false
              });
            }
          }
        }).finally(() => {
          this.showComment = false
        })
      },

      // Refresh comments of this post
      // Invoke when save or delete comment or reply
      refreshComments() {
        axios.get(`/open/post/comments/${this.post.id}`).then(res => {
          if (res.status === 200) {
            this.$set(this.post, 'comments', res.data.data)
          }
        })
      },

      formatTime(time) {
        return formatTime(time)
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0;
  }

  .vblog_post {
    margin-bottom: 10px;
    box-shadow: none;
    min-height: 150px;
  }

  .vblog_post_header {
    display: flex;
    flex-direction: row;
  }

  .vblog_post_header_content {
    display: flex;
    flex-direction: column;
    margin: 2px 0 0 10px;
    width: 100%;
  }

  .vblog-post-delete {
    float: right;
    margin: 10px 10px 0 0;
  }

  .vblog_post_post_time {
    font-size: small;
    padding-top: 2px;
    color: #606266
  }

  .vblog_post_content {
    padding: 10px 10px 5px 50px;
  }

  .vblog_post_images {
    padding: 0 10px 5px 50px;
  }

  .vblog_post_images_item {
    width: 33%;
    height: 180px;
  }

  .vblog-post-topics {
    padding: 0 10px 0 50px;
  }

  .vblog_post_operation_button {
    padding: 0 10px 5px 0;
    float: right;
  }

  .vblog_vote {
    margin: 5px 10px 5px 50px;
    padding: 0 0 5px 0;
    font-size: 14px;
    color: #68696b;
  }

  .vblog_comment {
    margin: 5px 10px 0 50px;
    padding: 0 0 5px 10px;
    background-color: rgb(249, 252, 255);
  }

  .vblog_comment_form {
    margin: 0 0 0 50px;
    width: 90%;
  }
</style>
