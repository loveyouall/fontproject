<template>
  <el-container style="height: calc(100vh);">
    <el-header style="height: calc(100vh - 800px); background: -webkit-linear-gradient(right, #330099, #0099FF); font-size: 80px; text-align: center;">某某设备管理系统
    </el-header>
    <el-container style="height：800px">
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #0099FF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00AAFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00BBFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00CCFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00DDFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00EEFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, rgb(113, 288, 202), rgb(34, 0, 180))"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00EEFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00DDFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00CCFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00BBFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00AAFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #0099FF, #330099)"></el-aside>
      <!-- <el-aside style="width: 97px; background: #00FFFF">操作提示</el-aside> -->

      <!-- <el-aside style="width: 2%; background: -webkit-linear-gradient(top, #00CCFF, #330099)"></el-aside>
      <el-aside style="width: 2%; background: -webkit-linear-gradient(top, #00DDFF, #330099)"></el-aside> -->
      <el-main style="background: #cccccc; width: 100%; padding-top:100px;padding-left: 200px;padding-right: 200px;">
        <el-container style="width: 90%; margin: 20px; ">
          <div style="width: 100px; margin-top: 8px;">用户名</div>
          <el-input
            placeholder="请输入用户名"
            v-model="username"
            clearable>
          </el-input>
        </el-container>
        <el-container style="width: 90%; margin: 20px;">
          <div style="width: 100px;margin-top: 8px;">密码</div>
          <el-input
          v-model="password"
          type = "password"
          placeholder="请输入密码"
          clearable>
        </el-input>
        </el-container>
         <el-radio v-model="select" label="1">老师/学生</el-radio>
        <el-radio v-model="select" label="2">管理员</el-radio>
        <el-container style="margin: 20px;">
        </el-container>
          <el-button type="primary" round @click="login()">登录</el-button>
          <el-button round @click="reset()">重置</el-button>
      </el-main>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #0099FF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00AAFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00BBFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00CCFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00DDFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00EEFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, rgb(113, 288, 202), rgb(34, 0, 180))"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00EEFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00DDFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00CCFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00BBFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #00AAFF, #330099)"></el-aside>
      <el-aside style="width: 30px; background: -webkit-linear-gradient(top, #0099FF, #330099)"></el-aside>
    </el-container>
  </el-container>
</template>
<script>
import {post} from './../http/http'
import {setCookie} from '../config/index'
export default {
  data () {
    return {
      username: '',
      password: '',
      select: ''
    }
  },
  methods: {
    reset () {
      this.username = ''
      this.password = ''
    },
    async login () {
      console.log(this.username)
      console.log(this.password)
      // let data = 111
      let res = await post('http://localhost:8080/login', {username: this.username, password: this.password, select: this.select})
      if (res.statusCode === 200) {
        if (res.status) {
          if (res.status.token === '3' || res.status.token === '2') {
            this.$router.push({path: '/main'})
          } else if (res.status.token === '1') {
            this.$router.push({path: '/manager'})
          }
          setCookie('token', res.status.token)
          setCookie('user', res.status.name)
        }
      } else if (res.statusCode === 400) {
        console.log(res)
        this.$message({
          dangerouslyUseHTMLString: true,
          type: 'warning',
          message: `<strong>${res.status}</strong>`,
          center: true
        })
      }
    }
  }
}
</script>
<style>
  *{
    padding: 0;
    margin: 0;
  }
</style>
