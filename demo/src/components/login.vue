<template>
<el-container style="height: 1000px;">
  <el-header>111
  </el-header>
  <el-container>
    <el-aside style="width: 200px;">222</el-aside>
    <el-main style="width: 90%">
      <el-container style="width: 90%; margin: 20px;">
        <div style="width: 100px">用户名</div>
        <el-input
        placeholder="请输入用户名"
        v-model="username"
        clearable>
      </el-input>
      </el-container>
       <el-container style="width: 90%; margin: 20px;">
        <div style="width: 100px">密码</div>
        <el-input
        v-model="password"
        type = "password"
        placeholder="请输入密码"
        clearable>
      </el-input>
      </el-container>
        <el-button type="primary" round @click="login()">登录</el-button>
       <el-button round @click="reset()">重置</el-button>
    </el-main>
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
      password: ''
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
      let res = await post('http://localhost:8080/login', {username: this.username, password: this.password})
      console.log(res)
      if (res.statusCode === 200) {
        if (res.status === true) {
          console.log(1111)
          this.$router.push({path: '/main'})
          this.setCookie('token', '111')
        }
      }
    }
  }
}
</script>
<style>

</style>
