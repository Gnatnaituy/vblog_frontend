<template>
  <el-card style= "margin-bottom: 10px; box-shadow: none; min-height: 200px;">
    <el-input type="textarea" :rows="3" placeholder="Post what you think..." v-model="post.content"></el-input>
    <div style="padding: 10px 10px 10px 50px">
      <el-image v-for="image in post.images" v-bind:key="image.id"
        :preview-src-list="post.images.map(image => image.url)"
        style="width: 100px; height: 100px"
        :src="image.url">
      </el-image>
    </div>
    <el-upload ref="upload" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" multiple
      :headers="header"
      :action="uploadUrl"
      :on-success="uploadSuccess"
      :on-remove="uploadRemove">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-button plain round size="mini" @click="savePost">Post</el-button>
  </el-card>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "PostWrite",

    data() {
      return {
        header: {
          Authorization: "Bearer " + this.$store.getters.token.accessToken
        },
        uploadUrl: "/upload/image",
        post: {
          content: '',
          visibility: '',
          images: [],
          topics: []
        }
      }
    },

    methods: {
      uploadSuccess(res) {
        if (res.code === '1') {
          let newImage = {
            url: res.data,
            sort: this.post.images.length
          }
          this.post.images.unshift(newImage)
          console.log(this.post)
        }
      },
      uploadRemove(file) {
        console.log(file)
      },
      savePost() {
        axios.post("/post/post/save", this.post).then(res => {
          if (res.status === 200) {
            axios.get(`/open/post/${res.data.data}`).then(response => {
              if (response.status === 200) {
                this.$store.commit('pushPost', response.data.data)
              }
            })
          }
        })
      }
    }
  };
</script>