<!--
<template>



  <div>
    <table class="cookMain" >
      <tr class="cookMainHead" style="width: 100%" >
        <th class="cookMainHeadth" style="width: 20%">桌号</th>
        <th class="cookMainHeadth" style="width: 20%">菜品</th>
        <th class="cookMainHeadth" style="width: 20%">数量</th>
        <th class="cookMainHeadth" style="width: 20%">状态</th>

      </tr>

      <tr class="cookMainList" v-for="items in cookCallResult" :key="items">

        <td>{{items[0]}}</td>
        <td>{{items[1]}}</td>
        <td>{{items[2]}}</td>
        <button @click="updateState(items[3],items[1],items[4])">{{items[3]}}</button>
      </tr>
    </table>

  </div>



</template>
-->

<template>
  <el-table
      :data="cookCallResult"

      border
      :row-style="{height:'30px'}"
      :row-class-name="tableRowClassName"
      style="font-size: 20px"
  >

    <el-table-column
        prop="table_id"
        label="桌号"
        width="350">
    </el-table-column>
    <el-table-column
        prop="dish_name"
        label="菜品"
        width="350">
    </el-table-column>
    <el-table-column
        prop="dish_number"
        label="数量"
        width="350">
    </el-table-column>
    <el-table-column
        prop="dish_state"
        label="状态"
        width="350">
    </el-table-column>

    <el-table-column

        label="更改状态"
    >
      <template slot-scope="scope">
        <el-button
            @click="updateState(scope.$index, cookCallResult)"
            type="text"
            size="middle">
          更改
        </el-button>
      </template>
    </el-table-column>

  </el-table>
</template>



<style>

/*
.cookMain {
  width: 1300px;
  table-layout :fixed;
  text-align: center;
  margin: 0 auto;
}
.cookMain .cookMainHead {
  font-size: 90px;
}
.cookMain .cookMainHead .cookMainHeadth {
  margin-left: 60px;
}
.cookMain .cookMainList {
  font-size: 30px;
  margin-top: 60px;
}
*/

.el-table .warning-row {

  background: burlywood;
}

.el-table .success-row {
  background: oldlace;
}


</style>


<script>
export default {
  name: "CookMain",
  data(){
    return{
      cookCallResult:"",
      state:'',
      id:'',
      dish_id:'',
    }

  },

  methods: {
    async cookCall() {
      try {
        const res = await this.$cloudbase.callFunction({
          name: "CookCall",
          data: {
          },
        });
        this.cookCallResult = res.result;


      } catch (e) {
        console.error(e)

        this.cookCallResult = e.message;
      }
    },

    async updateState(index, rows) {
      try {
        await this.$cloudbase.callFunction({
          name: "UpdateState",
          data: {
            state:rows[index]['dish_state'],
            id:rows[index]['order_id'],
            dish_id:rows[index]['dish_name'],
          },
        });

        await this.cookCall();


        //this.cookCallResult = res.result;

      } catch (e) {
        console.error(e)

        this.cookCallResult = e.message;
      }
      /*console.log(rows[index]['dish_state'])
      console.log(rows[index]['order_id'])
      console.log(rows[index]['dish_name'])*/

    },

    tableRowClassName({row,rowIndex}) {
      console.log(rowIndex)
      if (row['dish_state']==='未制作') {
        console.log(row['dish_state'])
        return 'warning-row';
      } else {
        return 'success-row';
      }


    },



  },

  mounted() {
    setTimeout(this.cookCall,0),

        setInterval(this.cookCall,5000)

  }

}
</script>

