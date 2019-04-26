<template>
  <div></div>
</template>

<script>
// import {fetch} from './../http/http'
import {getCookie, delCookie} from '../config/index'
// import {post, fetch, patch, put} from './../http/http'
export default {
  name: 'HelloWorld',
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
    // }
  },
  async mounted () {
    // this.user = getCookie('user')
    // this.token = getCookie('token')
    // if (this.token === '1') {
    //   await this.getStudent()
    // } else {
    //   await this.getTable()
    // }
    // await this.getSlider()
  },
  async updated () {
    // await this.getthis()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
