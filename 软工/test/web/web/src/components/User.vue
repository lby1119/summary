<template>
  <div>
  <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
<!-- 卡片视图 -->
    <el-card>
        <!-- 搜索添加区域 -->
        <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" >添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="phonenumber"></el-table-column>
        <el-table-column label="职位" prop="role"></el-table-column>
        <el-table-column label="状态" prop="condition">
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
            <el-button type="info" icon="el-icon-setting" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
    </template>

<script>
export default {
    data() {
        return {
            userlist: [{
            username: "1",
            phonenumber: "123",
            role: "厨师",
            condition: "正常"
            },
            {
            username: "2",
            phonenumber: "111",
            role: "经理",
            condition: "正常"
            },
            {
            username: "3",
            phonenumber: "122",
            role: "服务员",
            condition: "正常"
            },
            ],
        }
    }
}
</script>