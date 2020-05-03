<template>
  <el-card style= "margin-bottom: 10px; box-shadow: none">
    <!-- Post content -->
    <el-input type="textarea" :rows="3" placeholder="点击发表动态" v-model="post.content"></el-input>

    <!-- Post images preview -->
    <div style="padding: 5px 0 0 0">
      <el-image v-for="image in post.images" v-bind:key="image.id"
        :preview-src-list="post.images.map(image => image.url)"
        style="width: 33%; height: 33%"
        :src="image.url">
      </el-image>
    </div>

    <div style="display: flex; flex-direction: row">
      <!-- Image upload -->
      <el-upload ref="upload" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" multiple
        :headers="header"
        :action="uploadUrl"
        :on-success="uploadSuccess"
        :on-remove="uploadRemove">
        <el-button plain round size="mini">添加图片</el-button>
      </el-upload>

      <!-- Save post -->
      <el-button plain round size="mini" type="primary" @click="savePost">发布</el-button>
    </div>
  </el-card>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "PostWrite",

    data() {
      return {
        header: {
          Authorization: "Bearer " + this.$store.state.token.accessToken
        },
        uploadUrl: "/upload/image/post-image",
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
        }).finally(() => {
          this.post = {
            content: '',
            visibility: '',
            images: [],
            topics: []
          }
        })
      }
    }
  };
</script>
