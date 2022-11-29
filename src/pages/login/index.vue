<template >
  <div class="loginContainer">
    <el-form class="loginForm">
      <div class="title">
        <h3>登录</h3>
      </div>
      <el-form-item class="el-form-item">
        <a class="iconfont icon-yonghu iconfont"></a>
        <el-input
          v-model="username"
          placeholder="Username"
          type="text"
          class="el-input"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <a class="iconfont icon-mima iconfont"></a>
        <el-input @focus="this.isShowPwd=true" ref="password" v-model="password" placeholder="Password" :type="pwd"></el-input>
        <span class="showPwd" @click="changeShow">
          <i v-show="password" :class="this.isShowPwd === true ? 'iconfont icon-xianshimima' : 'iconfont icon-buxianshimima'"></i>
        </span>
      </el-form-item>
      <el-button type="primary" class="el-button" round @click="login"
        >登录</el-button
      >
      <div class="tips">
        <span>username: admin</span>
        <span>password: any</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'Login',
  data() {
    return {
      username: "",
      password: "",
      isShowPwd:false,
      pwd:'password'
    };
  },
  methods: {
    // 登录
    login() {
      if(this.username==''){
        this.$message({
          type:'warning',
          message:'请输入用户名'
        })
      }else if(this.password==''){
        this.$message({
          type:'warning',
          message:'密码不能为空'
        })
      }
      if(this.username=='admin'&&this.password!=='') this.$router.push('/home')
    },
    // 密码显示/隐藏
    changeShow() {
        this.isShowPwd=!this.isShowPwd;
        if(this.pwd=='password'){
          this.pwd='text';
        }else{
          this.pwd='password';
        }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.loginContainer {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #2d3a4b;
}
.loginContainer .loginForm {
  position: relative;
  max-width: 100%;
  padding: 300px 35px 0;
  margin: 0 auto;
  width: 520px;
}
.loginContainer .el-form-item {
  position: relative;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
  margin-bottom: 25px;
  font-size: 14px;
}
.loginContainer .el-input {
  position: relative;
  display: inline-block;
  height: 47px;
  width: 90%;
  padding: 12px 5px 12px 5px;
}
.el-input__inner {
  border-style: none;
  box-sizing: border-box;
  font-size: inherit;
  width: 100%;
  height: 100%;
  color: white;
  background-color: rgba(0, 0, 0, 0.1);
}
.loginContainer .el-button {
  display: inline-block;
  width: 100%;
  color: #eee;
  background: #409eff;
  border-color: #409eff;
  border-radius: 4px;
  line-height: 1;
  padding: 12px 20px;
  margin-bottom: 20px;
}
.loginContainer .iconfont {
  color: #889aa4;
  position: relative;
  top: 2px;
  margin: 0px 8px;
}
.showPwd{
  position:absolute;
  top: 15px;
  right: 15px;
}
.loginContainer .title {
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: bold;
  color: white;
  text-align: center;
}
.loginContainer .tips {
  color: white;
}
.loginContainer .tips span {
  margin: 0 10px;
}
</style>