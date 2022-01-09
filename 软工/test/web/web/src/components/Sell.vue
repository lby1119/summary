<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>经营情况</el-breadcrumb-item>
      <el-breadcrumb-item>销售情况</el-breadcrumb-item>
    </el-breadcrumb>
  <el-row class="home" :gutter="20">
    <!-- left -->
    <el-col :span="8" style="margin-top: 20px">
      <!-- user info -->
      <el-card shadow="hover">
        <!-- user图表 -->
        <div class="user">
          <img src="../assets/logo2.png">
          <div class="userInfo">
            <p class="name">Manager</p>
            <p class="access">餐厅销售情况</p>
          </div>
        </div>
      </el-card>
      <el-card style="margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column show-overflow-tooltip v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val">
      </el-table-column>
        </el-table>
        </el-card>
    </el-col>
    <!-- right -->
    <el-col :span="16" style="margin-top: 20px;">
      <!-- 上 -->
      <div class="num">
        <el-card shadow="hover" v-for="item in countData" :key="item.name" :body-style="{ display: 'flex',paddin: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- mid折线图 -->
      <el-card shadow="hover" style="height: 500px" ref="echart">
        <div>
        <div id="report" style="width: 1000px;height: 400px;"></div>
        </div>
      </el-card>
      <!-- <div class="graph">
        <el-card shadow="hover" style="height: 250px"></el-card>
        <el-card shadow="hover" style="height: 250px"></el-card>
      </div> -->
    </el-col>
  </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'; 
export default {
  name: "",
  data () {
    return {
       charts: "",
      score: "100",
      source: [
        ["菜品", "今日购买", "本月购买", "总购买"],
        ["菜品1", 30, 56, 78],
        ["菜品2", 13, 22, 24],
        ["菜品3", 8, 23, 42],
        ["菜品4", 12, 32, 42],
        ["菜品5", 20, 34, 60],
        ["菜品6", 35, 60, 75]
      ],
      tableData: [
        {
            name: '菜品1',
            todayBuy: 30,
            monthBuy: 56,
            totalBuy: 78
          },
          {
            name: '菜品2',
            todayBuy: 13,
            monthBuy: 22,
            totalBuy: 24
          },
          {
            name: '菜品3',
            todayBuy: 8,
            monthBuy: 23,
            totalBuy: 42
          },
          {
            name: '菜品4',
            todayBuy: 12,
            monthBuy: 32,
            totalBuy: 45
          },
          {
            name: '菜品5',
            todayBuy: 20,
            monthBuy: 34,
            totalBuy: 60
          },
          {
            name: '菜品6',
            todayBuy: 35,
            monthBuy: 60,
            totalBuy: 75
          }
      ],
      tableLabel: {
        name: '菜品',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: "今日收入",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日热销",
          value: '菜品1',
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日利润",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月收入",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月热销",
          value: '菜品2',
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月利润",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ]
    }
  },
  methods: {
    draw(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          source: this.source    //连接数据
        },
        xAxis: { type: "category" },    
        yAxis: {
        //这个地方如果需要在Y轴定义最大值就放开,如果需要根据数据自适应的话,就注释掉
          // type: "value",           
          // max: this.score,
          // maxInterval: this.score * 0.2,
          // minInterval: 1,
          // splitNumber: 4
        },
        grid: { bottom: 30 },
        series: [
          {
            type: "bar",    //表示这个是柱状图
            barCategoryGap: "40%",
            itemStyle: { color: "#999" },   //定义颜色
            tooltip: {
              formatter: params => {     
              //console.log(params)   打印这个params,按自己需要拼接字符串
                return ` ${params.value[0]} <br/>
                         ${params.seriesName}:${params.value[1]}`;
              }
            }
          },
          {
            type: "bar",
            barCategoryGap: "40%",
            itemStyle: { color: "#81cebe" },
            tooltip: {
              formatter: params => {
                return ` ${params.value[0]} <br/>
                         ${params.seriesName}:${params.value[2]}`;
              }
            }
          }
        ]
      });
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.draw("report");
    });
  }
}
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    &info {
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .access {
        color: #999999;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icon {
      font-size: 30px;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 14px;
        text-align: center;
        color: #999999;
      }
    }
  }
  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
    }
  }
}
</style>