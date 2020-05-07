<template>
  <el-card style= "margin-bottom: 10px; box-shadow: none">
    <!-- Post content -->
    <el-input type="textarea" :rows="3" placeholder="点击发表动态" v-model="post.content"></el-input>

    <!-- Post images upload -->
    <el-upload v-show="uploadVisible" class="upload-image"
               multiple accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
               :action="uploadUrl"
               list-type="picture-card"
               :on-success="uploadSuccess"
               :on-remove="uploadRemove">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <div class="img-wrapper">
          <img class="el-upload-list__item-thumbnail" object-fit="fit" :src="file.url" alt="">
        </div>
      </div>
    </el-upload>

    <el-select v-model="post.visibility" size="mini" placeholder="默认全部可见" style="margin-top: 10px;">
      <el-option label="全部可见" value="1"></el-option>
      <el-option label="仅好友可见" value="2"></el-option>
      <el-option label="仅自己可见" value="3"></el-option>
    </el-select>

    <div style="float: right; margin-top: 10px">
      <el-button plain size="mini" @click="toggleUpload()" style="border-radius: 5px">添加图片</el-button>
      <el-button plain size="mini" type="primary" @click="savePost" style="border-radius: 5px">发布</el-button>
    </div>
  </el-card>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "PostWrite",

    data() {
      return {
        fit: 'cover',
        uploadVisible: false,
        uploadUrl: "/open/upload/image/post-image",
        post: {
          content: '',
          visibility: null,
          images: [],
          topics: []
        }
      }
    },

    methods: {
      toggleUpload() {
        this.uploadVisible = !this.uploadVisible
      },
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
          this.toggleUpload()
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

<style scoped>
  .el-textarea >>> .el-textarea__inner {
    background-color: #F2F6FC;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-bottom-width: 0;
  }
  .upload-image {
    margin: 10px 0 0 0;
  }
  .img-wrapper {
    position: relative;
    padding-top: 100%;
  }
  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
  }
</style>
