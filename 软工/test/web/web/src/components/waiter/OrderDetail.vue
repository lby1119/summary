<template>
  <div>
    <div>桌号：{{ tableid }} 订单详情
      <el-button round @click="order">点餐</el-button>
      <el-button round @click="payform">结账</el-button>
    </div>
    <div v-show="!showpayform">
      <el-table
        :data="orderlist"
        stripe
        style="width: 100%">
        <el-table-column
          prop="[0]"
          label="订单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="[1]"
          label="菜品号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="[2]"
          label="菜品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="[3]"
          label="份数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="[4]"
          label="制作状态"
          width="155">
        </el-table-column>
        <el-table-column
          label="">
          <template slot-scope="scope">
            <div v-show="scope.row[4]=='未制作'">
              <el-button @click="cancel_dish(scope.row[0],scope.row[1])" size="small">点击取消</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="showpayform">
      结账
      <br>
      <el-table :data="paylist">
        <el-table-column property="[0]" label="菜品" width="150"></el-table-column>
        <el-table-column property="[1]" label="数量" width="150"></el-table-column>
        <el-table-column property="[2]" label="单价" width="200"></el-table-column>
        <el-table-column property="[3]" label="总价"></el-table-column>
      </el-table>
      订单总价：{{totalpay[0][0]}}
      <el-form :model="form">
        <el-form-item label="实付款" :label-width="formLabelWidth">
          <el-input v-model="form.price" placeholder="请输入价格" size="small"></el-input>
          <el-button type="primary" @click="paymoney">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

<!--    <el-dialog title="结账" :visible.sync="dialogVisible" modal="false" append-to-body="true">-->
<!--      <el-table :data="paylist">-->
<!--        <el-table-column property="[0]" label="菜品" width="150"></el-table-column>-->
<!--        <el-table-column property="[1]" label="数量" width="150"></el-table-column>-->
<!--        <el-table-column property="[2]" label="单价" width="200"></el-table-column>-->
<!--        <el-table-column property="[3]" label="总价"></el-table-column>-->
<!--      </el-table>-->
<!--         订单总价：{{totalpay[0][0]}}-->
<!--      <el-form :model="form">-->
<!--        <el-form-item label="实付款" :label-width="formLabelWidth">-->
<!--          <el-input v-model="form.price" placeholder="请输入价格"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="pay">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  props: ["tableid",'showpayform'],
  data: function () {
    return {
      orderlist: null,
      paylist:null,
      totalpay:[[null,],],
      form:{price:null,},
      formLabelWidth: '80px',

    };

  },


  methods: {
    async cancel_dish(order_id,dish_id) {
            try {
                await this.$cloudbase.callFunction({
                name: "cancel_dish",
                data: {
                    orderid:order_id,
                    dishid:dish_id,
                },
            });
            } catch (e) {
            console.error(e)
            }
    },


    async find_dish_by_tableid() {
            try {
                const res = await this.$cloudbase.callFunction({
                name: "find_dish_by_tableid",
                data: {
                    tableid:this.tableid,
                },
            });
            this.orderlist=res.result;
            } catch (e) {
            console.error(e)
            }
    },

    async paymoney() {
      try {
        let orderids = [];
        let moneylist = [];
        let i = 0;
        for (i = 0; i < this.orderlist.length; i++) {
          if (!orderids.includes(this.orderlist[i][0])) {
            orderids.push(this.orderlist[i][0]);
            if (i == 0) {
              moneylist.push(this.form.price);
            } else {
              moneylist.push(0);
            }
          }

        }
        await this.$cloudbase.callFunction({
          name: "pay_money",
          data: {
            moneylist: moneylist,
            orderids: orderids
          },
        });
        alert('支付成功');
        this.$emit('pay');
      } catch (e) {
        console.error(e)
      }
    },

    payform(){
      this.paylist=null;
      this.totalpay=null;
      this.form.price=null;
      this.getpaylist();
      this.gettotalpay();
      //this.dialogVisible = true;
      //this.showpayform=!this.showpayform;
      this.$emit('pay')
    },
    // pay(){
    //   //alert(this.form.price);
    //   this.dialogVisible = false;
    //   this.form.price=null;
    // },
    async gettotalpay() {
            try {
                const res = await this.$cloudbase.callFunction({
                name: "get_total_pay",
                data: {
                    tableid:this.tableid,
                },
            });
            this.totalpay=res.result;
            this.totalpay[0][0]=this.totalpay[0][0].toFixed(2);
            } catch (e) {
            console.error(e)
            }
    },
    async getpaylist() {
            try {
                const res = await this.$cloudbase.callFunction({
                name: "get_list",
                data: {
                    tableid:this.tableid,
                },
            });
            this.paylist=res.result;
            let i=0;
            for(i=0;i<this.paylist.length;i++){
              this.paylist[i][3]=this.paylist[i][3].toFixed(2);
            }
            } catch (e) {
            console.error(e)
            }
    },
    // getpaylist(){
    //
    // },
    // gettotalpay(){
    //   this.totalpay=[[110,],]
    // },
    order() {
      this.$emit('ordermenu');
    },

  },
  mounted() {
      setTimeout(this.find_dish_by_tableid,0),
      setInterval(this.find_dish_by_tableid,1000)
  }

}
</script>
