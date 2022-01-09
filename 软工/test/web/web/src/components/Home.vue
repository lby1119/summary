<template>
  <div>
    <el-container class="home-container">
      <!-- 头部 -->
      <el-header>
        <div>
          <img src="../assets/logo2.png">
          <span>餐厅后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">
          |||
        </div>
        <!-- 侧边栏菜单 -->
        <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      :router="true"
      default-active="">
      <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(item)"
        >
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      menu: [
        {
          path: "/menu",
          name: "menu",
          label: "菜单管理",
          icon: "s-order",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "员工管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "经营情况",
          icon: "s-marketing",
          children: [
            /* {
              path: "/inventory",
              name: "Inventory",
              label: "菜品库存",
              icon: "s-home",
              url: "Other/PageOne",
            },*/
            {
              path: "/sell",
              name: "Sell",
              label: "销售情况",
              icon: "s-data",
              url: "Other/Sell",
            },
          ],
        },
        {
          path: "/Table",
          name: "Table",
          label: "服务生界面",
          icon: "s-custom",
          url: "MallManage/MallManage",
        },
        {
          path: "/CookManger",
          name: "CookManger",
          label: "厨师界面",
          icon: "s-shop",
          url: "CookMangerManage/CookMangerManage",
        },
      ],
      isCollapse: false
    }
  },
    methods: {
      clickMenu(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    },
      /* 按钮切换菜单折叠 */
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      saveNavState(activePath) {
        window.sessionStorage.setItem('activePath', activePath)
      },
      logout() {
        //this.$router.push('/Login')
        this.$emit('skip','登录')
      }
    },
     computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    }
  }
</script>

<style lang="less" scoped>
.home-container {
  height: 100vh;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0%;
  align-items: center;
  color: #fff;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  img {
    width: 60px;
    height: 60px;
  }
}
.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eee;
}

.toggle-button {
  background-color: #333744;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
