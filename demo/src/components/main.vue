<template>
<el-container style="height: 1000px;">
  <el-header>
  </el-header>
  <el-container>
    <el-aside style="width: 200px;">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" icon-class="el-icon-document"></el-tree>
    </el-aside>
    <el-container>
      <el-main>
         <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="教室号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="province"
            label="可预约人数"
            width="70">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="100">
          </el-table-column>
           <el-table-column
            prop="address"
            label="日期"
            width="100">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="座位"
            width="120">
          </el-table-column>
          <el-table-column
            label="起始时间"
            width="160">
            <template slot-scope="scope">
              <el-time-select
                v-model="scope.row.startTime"
                :picker-startTime="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                  minTime: scope.row.startTime
                }">
              </el-time-select>
            </template>
          </el-table-column>
          <el-table-column
            label="结束时间"
            width="150">
            <template slot-scope="scope">
            <el-time-select
              v-model="scope.row.endTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: scope.row.startTime
              }">
            </el-time-select>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="预约状态"
            width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.value2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="get(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</el-container>
</template>

<script>
import {fetch} from './../http/http'
import {setCookie} from '../config/index'
// import {post, fetch, patch, put} from './../http/http'
export default {
  name: 'HelloWorld',
  data () {
    return {
      startTime: '',
      endTime: '',
      value2: true,
      tableData: [],
      data: [],
      defaultProps: {
      },
      activeName: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    async get (e) {
      // 发送预约请求/取消预约请求
      let answer = await fetch(`http://localhost:8080/${e.id}/test`)
      if (answer.statusCode === 200) {
        if (answer.status === 'false') {
          e.value2 = !e.value2
        }
      }
      // let res = true
    },
    async getSlider (e) {
      // 获取默认左侧栏
      let answer = await fetch('http://localhost:8080/list')
      if (answer.statusCode === 200) {
        console.log(answer)
        this.data = answer.table
        this.defaultProps = {
          children: 'children',
          label: 'label'
        }
      }
    },
    handleNodeClick (e) {
      if (!e.children) {
        // 获取特点的table
        // let answer = await fetch('')
      }
    },
    handleClick () {
      console.log(111)
    },
    async getTable () {
      let tableData = await fetch('http://localhost:8080/')
      this.tableData = tableData
      console.log('tableData', this.tableData)
    }
  },
  async mounted () {
    let token = getcook
    // if()
    await this.getTable()
    await this.getSlider()
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
</style>
