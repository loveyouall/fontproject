<template>
<div>
</div>
</template>

<script>
import {fetch} from './../http/http'
import {getCookie, delCookie} from '../config/index'
export default {
  data () {
    return {
      // user: '',
      // token: '',
      // startTime: '',
      // endTime: '',
      // value2: true,
      // tableData: [],
      // data: [],
      // defaultProps: {
      // },
      // activeName: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    // cancelLogin () {
    //   delCookie('token')
    //   delCookie('user')
    //   this.$router.push({path: '/'})
    // },
    // async getSlider () {
    //   let data
    //   console.log(this.token)
    //   if (this.token === '3') {
    //     data = await fetch('http://localhost:8080/classroom')
    //   }
    //   console.log(data.table)
    //   let {table} = data
    //   this.data = table
    // },
    // async handleNodeClick (e) {
    //   //  console.log(e.label)
    //   if (e) {
    //     console.log(e.label)
    //     // 获取特点的table
    //     if (this.token === '3') {
    //       let res = await fetch('http://localhost:8080/classroomDetail', {'no': e.label})
    //       console.log(res)
    //     }
    //   }
    // }
  },

  async mounted () {
    // this.user = getCookie('user')
    // this.token = getCookie('token')
    // console.log(this.token, 'token')
    // // 老师
    // if (this.token === 2) {
    //   // await this.getStudent()
    //   // await this.getSlider(this.token)
    //   // 学生
    // } else if (this.token === 3) {
    //   console.log(444)
    //   // await this.getTable()
    // }
    // if (this.token) {
    //   await this.getSlider()
    // }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .right{
    float: right;
  }
</style>
