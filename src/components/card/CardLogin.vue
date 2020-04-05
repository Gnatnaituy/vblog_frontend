<template>
  <el-card class="box-card" shadow="never" style="border-radius: 5px">
    <h1 style="text-align: center">VBLOG - LOGIN</h1>
    <el-form ref="loginForm" :model="loginForm" :rules="rules" style="padding-top: 20px;">

      <!-- Username and Password fields -->
      <el-form-item prop="username">
        <el-input placeholder="Username" v-model="loginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="Password" type="password" v-model="loginForm.password" clearable></el-input>
      </el-form-item>

      <!-- Login and Register Buttons -->
      <el-form-item size="medium" style="text-align: center; width: 100%">
        <el-button @click.native.prevent="login('loginForm')" style="float: left; width: 47%">Login</el-button>
        <el-button @click.native.prevent="login('loginForm')" style="float: right; width: 47%">Register</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: "CardLogin",

    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: 'Please input username', trigger: 'blur'},
            {max: 10, message: 'Username should no more than 10 characters', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please input password', trigger: 'blur'},
            {min: 4, max: 16, message: 'Password should between 4 and 16 characters', trigger: 'blur'}
          ]
        }
      }
    },

    methods: {
      login(formName) {
        let that = this
        console.log(this.loginForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$store.dispatch('login', that.loginForm).then(() => {
              that.$router.go(-1)
            }).catch((error) => {
              if (error !== 'error') {
                that.$message({message: error, type: 'error', showClose: true});
              }
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
