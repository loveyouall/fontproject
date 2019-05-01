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
      <el-main style="background: #cccccc; width: 100%; padding: auto;">
        <div class='title'>设备管理系统</div>
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
// import { Message } from 'element-ui'
import { fetch } from './../http/http'
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
    // 登陆
    async login () {
      try {
        let res
        if (this.username && this.password) {
          res = await fetch('http://localhost:8080/login', {username: this.username, password: this.password})
          // console.log(res)
          let data = res.data[0]
          console.log(data)
          if (res.code === 200) {
            console.log(data.permission)
            // 根据权限进入不同的页面
            // 0 一级管理员页面 1 二级管理员页面
            if (data.permission === 0) {
              console.log('一级管理员')
              setCookie('user', JSON.stringify(data))
              this.$message({
                message: '用户登录成功',
                type: 'success'
              })
              this.$router.push({path: '/main'})
            } else if (data.permission === 1) {
              setCookie('user', JSON.stringify(data))
              this.$message({
                message: '用户登录成功',
                type: 'success'
              })
              this.$router.push({path: '/manager'})
            } else {
              this.$message({
                message: '用户信息错误',
                type: 'error'
              })
            }
          }
        } else {
          // 没有输入用户名或者密码
          this.$message({
            message: '请重新输入用户名和密码',
            type: 'error'
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .title {
    font-size: 60px;
    margin-bottom: 100px;
  }
</style>
