<template>
  <div id="register" v-title data-title="Register - VBLOG">
    <div class="me-login-box me-login-box-radius">
      <h1>VBLOG</h1>

      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="username">
          <el-input placeholder="Username" v-model="userForm.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="Password" type="password" v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item prop="repeatPassword">
          <el-input placeholder="Repeat Password" type="password" v-model="userForm.repeatPassword"></el-input>
        </el-form-item>

        <el-form-item size="medium" class="me-login-button">
          <el-button type="primary" @click.native.prevent="register('userForm')">Register</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',

    data() {
      return {
        userForm: {
          username: '',
          password: '',
          repeatPassword: ''
        },
        rules: {
          username: [
            { required: true, message: 'Please input username', trigger: 'blur'},
            { min: 3, max: 16, message: 'Username should contains 3 to 16 characters', trigger: 'blur'}
          ],
          password: [
            { required: true, message: 'Please input password', trigger: 'blur'},
            { min: 8, max: 16, message: 'Password should contains 8 to 16 characters', trigger: 'blur'}
          ],
          repeatPassword: [
            { required: true, message: 'Please repeat your password', trigger: 'blur'},
            { min: 8, max: 16, message: 'Password should contains 8 to 16 characters', trigger: 'blur'},
            { }
          ]
        }

      }
    },

    methods: {
      register(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$store.dispatch('register', that.userForm).then(() => {
              that.$message({message: 'Register success! Please login', type: 'success', showClose: true});
              that.$router.push({path: '/'})
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
  #login {
    min-width: 100%;
    min-height: 100%;
  }

  .me-login-box {
    position: absolute;
    width: 300px;
    height: 300px;
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
