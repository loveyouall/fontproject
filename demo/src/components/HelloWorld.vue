<template>
<el-container style="height: 1000px;">
  <el-header>
  </el-header>
  <el-container>
    <el-aside style="width: 200px;">
      <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" icon-class="el-icon-document" highlight-current="true"></el-tree> -->
    </el-aside>
    <el-container>
      <el-main>
         <!-- <el-table
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
                v-model="startTime"
                :picker-startTime="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                  minTime: tableData.startTime
                }">
              </el-time-select>
            </template>
          </el-table-column>
          <el-table-column
            label="结束时间"
            width="150">
            <template slot-scope="scope">
            <el-time-select
              v-model="endTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: tableData.startTime
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
                v-model="tableData.value2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="get()">
              </el-switch>
            </template>
          </el-table-column>
        </el-table> -->
      </el-main>
    </el-container>
  </el-container>
</el-container>
</template>

<script>
import {fetch} from './../http/http'
import axios from 'axios'

// import {post, fetch, patch, put} from './../http/http'
export default {
  name: 'HelloWorld',
  data () {
    return {
      startTime: '',
      endTime: '',
      value2: true,
      tableData: '',
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      activeName: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    get () {
      console.log(1111)
    },
    handleNodeClick (e) {
      if (!e.children) {
        console.log(e.label)
        console.log(1111)
      }
    },
    handleClick () {
      console.log(111)
    },
    async getthis () {
      let tableData = await fetch('http://localhost:8080/#/')
      for (let i in tableData) {
        this.tableData = tableData[i]
      }
      console.log(tableData)
      this.tableData = tableData
      console.log(this.tableData)
    }
  },
  async mounted () {
    console.log(axios.defaults)
    await this.getthis()
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
