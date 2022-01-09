<template>

  <div>
    <div v-show="!showmenu">
    <div class="tables">
      <el-button @click="showfreetable=!showfreetable" round>显示空闲桌子</el-button>
      <div>
        <my-table class="mytable" v-for="(state,index) of tablelist" :key="state"
                  @choosetable="nowtable=$event;drawer=true;showpay=false" :tableid="state[0]"
                  :tablestate="state[1]" v-show="showfreetable?  isfree(index) : true " @stoprefresh="stop" @startrefresh="start"></my-table>
      </div>
    </div>
<!--    <order-detail class="orderdetail" :tableid="nowtable" v-show="nowtable==-1? false : true"></order-detail>-->
    <el-drawer
      :visible="drawer"
      :before-close="handleClose"
      size="65%">
      <order-detail class="orderdetail" :tableid="nowtable" :showpayform="showpay" @ordermenu="drawer=false;showmenu=true;" @pay="showpay=(!showpay)"></order-detail>
    </el-drawer>
    </div>

    <div v-show="showmenu" >
      <button style="margin-left:400px" @click="showmenu=false;drawer=true;">返回前台页面</button>
      <Menu :desk="nowtable"></Menu>

    </div>
  </div>


</template>

<script>
import MyTable from './MyTable.vue'
import OrderDetail from './OrderDetail.vue'
import Menu from "./Menu";
export default {
  name: 'AllTables',
  components: {
    MyTable,
    OrderDetail,
    Menu,
  },
  data: function () {
    return {
      tablelist: [[1, "空闲"], [2, "空闲"], [3, "33"], [4, "空闲"], [5, "123"], [6, "空闲"], [7, "123"], [8, "123"], [9, "123"]],
      showfreetable: false,
      nowtable: -1,
      drawer:false,
      showmenu:false,
      showpay:false,
      refresh:null,
    }
  },
  methods: {
    isfree: function (i) {
      console.log(this.tablelist[i]);
      if (this.tablelist[i][1] == "空闲") return true;
      else return false;
    },
    handleClose() {
      this.drawer=false;
    },


    stop(){
      clearInterval(this.refresh);
    },
    start(){
      this.refresh=setInterval(this.get_table_state,1000);
    },

    async get_table_state() {
            try {
                const res = await this.$cloudbase.callFunction({
                name: "get_table_state",
                data: {

                },
            });
            this.tablelist=res.result;
            } catch (e) {
            console.error(e)
            }
    }
   },
  mounted() {
      setTimeout(this.get_table_state,0),
      this.refresh=setInterval(this.get_table_state,1000)

  }
}
</script>

<style>
.tables {
  /*float: left;*/
  /*width: 100%;*/
  /* background-color: rgb(233, 119, 119); */
}

.orderdetail {
  float: left;
  width: 100%;
  /* background-color: rgb(97, 95, 95); */
}

.mytable {
  float: left;
  width: 25%;
  height: 200px;
  margin-left: 90px;

}

</style>
