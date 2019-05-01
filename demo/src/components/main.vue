<template>
<el-container>
  <el-header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">人员管理</el-menu-item>
      <el-menu-item index="2">设备管理</el-menu-item>
    </el-menu>
  </el-header>
  <el-container>
    <el-aside width="200px" margin-right='200px'>
      <el-tree :data="treeData" @node-click="handleNodeClick"></el-tree>
    </el-aside>
    <el-main height='auto'>
      <el-form ref="form" :model="form" label-width="200px" v-if='mainStatus === 1'>
        <el-form-item label="用户名">
          <el-input v-model="form.name" maxlength=10></el-input>
        </el-form-item>
        <el-form-item label="登陆账号">
          <el-input v-model="form.username" type='number' maxlength=10></el-input>
        </el-form-item>
        <el-form-item label="登陆密码">
          <el-input v-model="form.newpassword" type='password' maxlength=10></el-input>
        </el-form-item>
         <el-form-item label="重复密码">
          <el-input v-model="form.resetpassword" type='password' maxlength=10></el-input>
        </el-form-item>
        <el-form-item label="权限设置">
          <el-input v-model="form.permission" type='number' maxlength=1></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onManagerSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="ManagerData"
        style="width: 100%"
        v-if='mainStatus === 2'>
        <el-table-column
          prop="uid"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="username"
          label="登陆账号">
        </el-table-column>
         <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleUpdataClick(scope.row)" type="text" size="small">权限升级</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form ref="form" :model="subject" label-width="200px" v-if='mainStatus === 3'>
        <el-form-item label="分类名称">
          <el-input v-model="subject.name" maxlength=10></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubjectSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
       <el-table
        :data="SubjectData"
        style="width: 100%"
        v-if='mainStatus === 4'>
        <el-table-column
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备分类名称">
        </el-table-column>
         <el-table-column
          prop="orderBy"
          label="创建者">
        </el-table-column>
         <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleDeteleClick(scope.row)" type="text" size="small">删除分类</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
// 一级管理员页面
import {fetch} from './../http/http'
import {getCookie} from '../config/index'
export default {
  data () {
    return {
      treeData: [],
      // 右侧显示状态  mainStatus 10000000000
      mainStatus: 0,
      userData: [{
        label: '添加管理员',
        id: 1
      }, {
        label: '更改管理员权限',
        id: 2
      }],
      equipmentData: [{
        label: '添加设备分类',
        id: 3
      }, {
        label: '删除设备分类',
        id: 4
      }, {
        label: '设备使用情况',
        id: 5
      }],
      activeIndex: '1',
      form: {
      },
      subject: {},
      ManagerData: [],
      SubjectData: []
    }
  },
  methods: {
    // 权限升级
    handleUpdataClick (e) {
      this.$alert('确认为该用户权限升级，该操作不可逆', '操作提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.upDataManagerInfo(action, e)
        }
      })
    },

    // 删除分类
    handleDeteleClick (e) {
      this.$alert('确认是否删除该分类，该操作不可逆', '操作提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.deleteSubjectInfo(action, e)
        }
      })
    },
    // 权限升级
    async upDataManagerInfo (action, e) {
      if (action === 'confirm') {
        let res = await fetch('http://localhost:8080/upDataManagerInfo', {username: JSON.stringify(e.username)})
        if (res.code === 200 && res.data) {
          if (res.data.affectedRows && res.data.affectedRows === 1) {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.getManager()
          } else {
            this.$message({
              message: '更新失败',
              type: 'error'
            })
          }
        }
      }
    },
    // 删除分类
    async deleteSubjectInfo (action, e) {
      if (action === 'confirm') {
        let res = await fetch('http://localhost:8080/deleteSubjectInfo', {id: e.id})
        if (res.code === 200 && res.data) {
          if (res.data.affectedRows && res.data.affectedRows === 1) {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.getSubject()
          } else {
            this.$message({
              message: '更新失败',
              type: 'error'
            })
          }
        }
      }
    },
    // 选择侧边栏
    handleNodeClick (e) {
      this.mainStatus = e.id
      if (e.id === 1) {
        this.$message({
          message: '密码仅为数字',
          type: 'warning'
        })
      } else if (e.id === 2) {
        this.getManager()
      } else if (e.id === 4) {
        this.getSubject()
      }
      console.log(e.id)
    },
    // 获取非一级管理员信息
    async getManager () {
      let res = await fetch('http://localhost:8080/getManager')
      console.log(res.data)
      if (res.code === 200) {
        this.ManagerData = res.data
      }
    },
    // 获取类别信息
    async getSubject () {
      let res = await fetch('http://localhost:8080/getSubject')
      console.log(res.data)
      if (res.code === 200) {
        this.SubjectData = res.data
      }
    },
    // 选择顶部栏
    handleSelect (e) {
      this.activeIndex = e
      if (e === '1') {
        this.treeData = this.userData
      } else if (e === '2') {
        this.treeData = this.equipmentData
      }
    },
    // 创建管理员
    onManagerSubmit () {
      this.formatManager(this.form)
    },
    // 创建分类
    onSubjectSubmit () {
      this.formatSubject(this.subject)
    },
    // 验证分类参数是否存在
    async formatSubject (target) {
      let count = 0
      let name
      let res = JSON.parse(getCookie('user'))
      console.log(res)
      if (res && res.name) {
        name = res.name
        count++
      } else {
        this.$message({
          message: '请重新登录',
          type: 'error'
        })
      }
      if (target.name) {
        count++
      } else {
        this.$message({
          message: '请输入分类名称'
        })
      }
      if (count === 2) {
        let res = await fetch('http://localhost:8080/createSubject', {form: {
          name: target.name,
          orderBy: name
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
    // 验证管理员参数是否存在
    async formatManager (target) {
      let count = 0
      if (target) {
        if (target.name) {
          count++
        } else {
          this.$message({
            message: '用户名不能为空'
          })
        }
        if (target.username && target.username.length < 10) {
          count++
        } else if (target.username && target.username.length > 10) {
          this.$message({
            message: '账号过长',
            type: 'error'
          })
        } else {
          this.$message({
            message: '账号不能为空',
            type: 'error'
          })
        }
        if (target.newpassword && target.resetpassword) {
          if (!isNaN(parseInt(target.newpassword)) && !isNaN(parseInt(target.resetpassword))) {
            if (target.newpassword === target.resetpassword) {
              count++
            } else {
              this.$message({
                message: '密码不匹配',
                type: 'error'
              })
            }
          } else {
            this.$message({
              message: '密码应为数字',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '密码不能为空',
            type: 'error'
          })
        }
        if (target.permission === '0' || target.permission === '1') {
          count++
        } else {
          this.$message({
            message: '权限输入不正确，应为0或1',
            type: 'error'
          })
        }
        if (count === 4) {
          let res = await fetch('http://localhost:8080/createUser', {form: {
            newpassword: target.newpassword,
            permission: target.permission,
            name: target.name,
            username: target.username
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
      }
    }

  },
  async mounted () {
    this.treeData = this.userData
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
    padding: 20px;
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
