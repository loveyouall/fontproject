<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">创建设备信息</el-menu-item>
        <el-menu-item index="2">删除设备信息</el-menu-item>
        <el-menu-item index="3">设备信息录入</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-main height='auto'>
        <el-form ref="form" :model="equipment" label-width="200px" v-if='mainStatus === 1'>
          <el-form-item label="设备名称">
            <el-input v-model="equipment.name" maxlength=10></el-input>
          </el-form-item>
          <el-form-item label="设备分类">
            <el-select v-model="equipment.subject" placeholder="请选择设备分类">
            <el-option
              v-for="item in option"
              :key="item.id"
              :label="item.name"
              :value="item">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="设备数量">
            <el-input v-model="equipment.num" type='number' maxlength=10></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onEquipmentSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="EquipmentData"
          style="width: 100%"
          v-if='mainStatus === 2'>
          <el-table-column
            prop="id"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="设备名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="subjectName"
            label="设备分类">
          </el-table-column>
          <el-table-column
            prop="num"
            label="设备剩余数量">
          </el-table-column>
           <el-table-column
            prop="borrowNum"
            label="设备借出数量">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleDeleteClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          :data="EquipmentData"
          style="width: 100%"
          v-if='mainStatus === 3'>
          <el-table-column
            prop="id"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="设备名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="subjectName"
            label="设备分类">
          </el-table-column>
          <el-table-column
            prop="num"
            label="设备剩余数量">
          </el-table-column>
          <el-table-column
            prop="borrowNum"
            label="设备借出数量">
          </el-table-column>
          <el-table-column
            label="操作的设备数量">
            
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.factNum"
                size="mini"
                placeholder="输入操作的设备数量"/>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleBorrowClick(scope.row)" type="text" size="small">借出</el-button>
              <el-button @click="handleBackClick(scope.row)" type="text" size="small">回收</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {fetch} from './../http/http'
import {getCookie} from '../config/index'
// import {getCookie, delCookie} from '../config/index'
// import {post, fetch, patch, put} from './../http/http'
export default {
  name: 'HelloWorld',
  data () {
    return {
      mainStatus: 1,
      activeIndex: '1',
      equipment: {},
      option: [],
      EquipmentData: []
    }
  },
  methods: {
    handleSelect (e) {
      this.mainStatus = parseInt(e)
      if (e === '2' || e === '3') {
        this.getEquipment()
      }
      console.log(e)
    },
    handleDeleteClick (el) {
      console.log(el)
      this.$alert('确认删除该设备信息，该操作不可逆', '操作提示', {
        confirmButtonText: '确定',
        callback: action => {
          console.log(el.id)
          this.deleteEquipmentInfo(action, el)
        }
      })
    },
    handleBorrowClick (el) {
      this.$alert('确认借出该设备，该操作不可逆', '操作提示', {
        confirmButtonText: '确定',
        callback: action => {
          console.log(el.id)
          this.operateEquipment(action, el, 1)
        }
      })
    },
    handleBackClick (el) {
     this.$alert('确认回收了该设备，该操作不可逆', '操作提示', {
        confirmButtonText: '确定',
        callback: action => {
          console.log(el.id)
          this.operateEquipment(action, el, 0)
        }
      })
    },
    async operateEquipment(action, el, type) {
      let name
      let res = JSON.parse(getCookie('user'))
      if (res && res.name) {
        name = res.name
      }
      el.orderBy = name
      if (el.factNum > 0 && type === 1 && el.factNum <= el.num) {
        if (action === 'confirm') {
          let res = await fetch('http://localhost:8080/divideEquipmentInfo', {form: JSON.stringify(el)})
          if (res.code === 200 && res.data) {
            if (res.data.affectedRows && res.data.affectedRows === 1) {
              this.$message({
                message: '借出成功',
                type: 'success'
              })
              this.getEquipment()
            } else {
              this.$message({
                message: '借出失败',
                type: 'error'
              })
            }
          }
        }
      }
      if (el.factNum > 0 && type === 0 && el.factNum <= el.borrowNum) {
        if (action === 'confirm') {
          let res = await fetch('http://localhost:8080/addEquipmentInfo', {form: JSON.stringify(el), orderBy: name})
          if (res.code === 200 && res.data) {
            if (res.data.affectedRows && res.data.affectedRows === 1) {
              this.$message({
                message: '回收成功',
                type: 'success'
              })
              this.getEquipment()
            } else {
              this.$message({
                message: '回收失败',
                type: 'error'
              })
            }
          }
        }
      }
    },
    // 删除设备
    async deleteEquipmentInfo (action, e) {
      if (action === 'confirm') {
        let res = await fetch('http://localhost:8080/deleteEquipmentInfo', {id: JSON.stringify(e.id)})
        if (res.code === 200 && res.data) {
          if (res.data.affectedRows && res.data.affectedRows === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getEquipment()
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        }
      }
    },
    onEquipmentSubmit () {
      console.log(this.equipment, 999)
      this.formatEquipment(this.equipment)
    },
    // 校验设备输入信息
    async formatEquipment (target) {
      let count = 0
      if (target.name) {
        count++
      } else {
        this.$message({
          message: '请输入设备名称',
          type: 'warning'
        })
      }
      if (target.num) {
        count++
      } else {
        this.$message({
          message: '请输入设备数量',
          type: 'warning'
        })
      }
      if (target.subject) {
        count++
      } else {
        this.$message({
          message: '请重新选择分类',
          type: 'warning'
        })
      }
      if (count === 3) {
        let res = await fetch('http://localhost:8080/createEquipment', {form: {
          name: target.name,
          subject: target.subject,
          num: target.num
        }})
        if (res.code === 200 && res.data) {
          if (res.data.affectedRows && res.data.affectedRows === 1) {
            this.$message({
              message: '创建成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '创建失败, 数据库中已存在',
              type: 'error'
            })
          }
        }
      }
    },
    // 获取设备列表
    async getEquipment () {
      let res = await fetch('http://localhost:8080/getEquipment')
      console.log(res)
      this.EquipmentData = res.data
    }
    // cancelLogin () {
    //   delCookie('token')
    //   delCookie('user')
    //   this.$router.push({path: '/'})
    // }
  },
  async mounted () {
    let res = await fetch('http://localhost:8080/getSubject')
    console.log(res)
    if (res.code === 200 && res.data) {
      this.option = res.data
    }
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
