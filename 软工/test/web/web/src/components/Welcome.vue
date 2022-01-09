<template>
    <div class="back">
        <p class="welcome" style="padding-left: 20px">Welcome  餐厅管理系统</p>
        <p class="from" style="padding-left: 30px">Designed by NKU</p>
    <el-row :gutter="20">
        <el-col :span="6" style="padding-left: 40px"><div>
            <el-card shadow="hover">
            <img src="../assets/manager.png" style="width:300px;height: 300px;border-radius: 50%">
            </el-card>
            <p class="intro">欢迎使用餐厅后台管理系统，在这里您可以修改菜单，添加员工信息，也可以获取菜品的库存和销售情况，实时掌握您的餐厅经营情况在。衷心希望我们的设计可以为您的经营带来便利。</p>
            <p class="thanks">Thanks for using!</p>
            </div></el-col>
        <el-col :span="12"><div>
        <el-calendar v-model="value" style="">
        </el-calendar>
        </div></el-col>       
</el-row>
<el-descriptions title="用户信息" direction="vertical" :column="4" border style="width: 75%;padding-left: 40px">
            <el-descriptions-item label="用户名">Manager</el-descriptions-item>
            <el-descriptions-item label="手机号">1000000</el-descriptions-item>
            <el-descriptions-item label="居住地" :span="2">天津市</el-descriptions-item>
            <el-descriptions-item label="职位">经理</el-descriptions-item>
            <el-descriptions-item label="联系地址">天津市南开大学泰达学院</el-descriptions-item>
            </el-descriptions>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        value: new Date()
      }
    }
  }
</script>

<style lang="less" scoped>
.back {
    background-color: lavender;
    height: 100vh;
}

.welcome {
    font-size: 60px;
    color: #5882FA;
}

.from {
    font-size: 30px;
    color: #CC2EFA;
}

.intro {
    font-size: 20px;
}

.thanks {
    font-size: 40px;
    color: firebrick;
}
</style>