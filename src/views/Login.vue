<template>
  <div id="login" v-title data-title="Login - VBLOG">
    <div class="me-login-box me-login-box-radius">
      <h1>VBLOG</h1>
      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="username">
          <el-input placeholder="Username" v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="Password" type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item size="medium" class="me-login-button">
          <el-button type="primary" @click.native.prevent="login('userForm')">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui';

  export default {
    name: 'Login',

    data() {
      return {
        userForm: {
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('Login.vue --> ' + that.userForm.username)
            that.$store.dispatch('storeLogin', that.userForm).then(() => {
              that.$router.go(-1)
            }).catch((error) => {
              if (error !== 'error') {
                Message({ message: error, type: 'error', showClose: true });
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
  #login {
    min-width: 100%;
    min-height: 100%;
  }

  .me-login-box {
    position: absolute;
    width: 300px;
    height: 230px;
    background-color: white;
    margin-top: 150px;
    margin-left: -180px;
    left: 50%;
    padding: 30px;
  }

  .me-login-box-radius {
    border-radius: 10px;
    box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
  }

  .me-login-box h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    vertical-align: middle;
  }

  .me-login-button {
    text-align: center;
  }

  .me-login-button button {
    width: 100%;
  }
</style>
